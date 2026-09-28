param(
    [int]$Port = 3000
)

$root = (Get-Item $PSScriptRoot).FullName
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
$listener.Start()
Write-Host "Portfolio Server running at http://localhost:$Port"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".mp4"  = "video/mp4"
    ".ico"  = "image/x-icon"
}

$buf = New-Object byte[] 8192

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        
        $bytesRead = 0
        try {
            $stream.ReadTimeout = 3000
            $bytesRead = $stream.Read($buf, 0, $buf.Length)
        } catch {
            $client.Close()
            continue
        }
        
        if ($bytesRead -le 0) {
            $client.Close()
            continue
        }
        
        $reqHeader = [System.Text.Encoding]::ASCII.GetString($buf, 0, $bytesRead)
        $firstLine = $reqHeader.Split("`n")[0].Trim()
        $parts = $firstLine.Split(' ')
        if ($parts.Length -lt 2) {
            $client.Close()
            continue
        }
        
        $method = $parts[0]
        $rawPath = $parts[1].Split('?')[0]
        if ($rawPath -eq "/" -or [string]::IsNullOrEmpty($rawPath)) {
            $rawPath = "/index.html"
        }
        
        $relPath = [System.Uri]::UnescapeDataString($rawPath.TrimStart('/'))
        $localPath = [System.IO.Path]::Combine($root, $relPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
        
        try {
            if ([System.IO.File]::Exists($localPath)) {
                $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
                $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $fileBytes = [System.IO.File]::ReadAllBytes($localPath)
                
                $header = "HTTP/1.1 200 OK`r`n" +
                          "Content-Type: $contentType`r`n" +
                          "Content-Length: $($fileBytes.Length)`r`n" +
                          "Cache-Control: no-cache, no-store, must-revalidate`r`n" +
                          "Pragma: no-cache`r`n" +
                          "Expires: 0`r`n" +
                          "Accept-Ranges: bytes`r`n" +
                          "Access-Control-Allow-Origin: *`r`n" +
                          "Connection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                
                $stream.Write($headerBytes, 0, $headerBytes.Length)
                $stream.Write($fileBytes, 0, $fileBytes.Length)
            } else {
                $body = "404 Not Found: $relPath"
                $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
                $header = "HTTP/1.1 404 Not Found`r`n" +
                          "Content-Type: text/plain; charset=utf-8`r`n" +
                          "Content-Length: $($bodyBytes.Length)`r`n" +
                          "Connection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                
                $stream.Write($headerBytes, 0, $headerBytes.Length)
                $stream.Write($bodyBytes, 0, $bodyBytes.Length)
            }
            $stream.Flush()
        } catch {
            # Client disconnected early, ignore
        } finally {
            $client.Close()
        }
    }
} finally {
    $listener.Stop()
}
