import qrcode

# Link para incluir no QR code
link = "https://tony.softdrive.com.br/index.html"

# Gerar o QR code
qr = qrcode.make(link)

# Salvar como uma imagem
qr.save("meu_qrcode.png")
