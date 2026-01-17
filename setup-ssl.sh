#!/bin/bash

# ============================================
# Configurar SSL com Let's Encrypt
# ============================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

DOMAIN="${1:-}"

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║           CONFIGURAÇÃO DE SSL (HTTPS)                     ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

if [ -z "$DOMAIN" ]; then
    echo -e "${RED}[ERRO] Domínio não informado!${NC}"
    echo ""
    echo -e "Uso: ${YELLOW}sudo bash setup-ssl.sh seu-dominio.com.br${NC}"
    echo ""
    exit 1
fi

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}[ERRO] Este script precisa ser executado como root (sudo)${NC}"
    exit 1
fi

echo -e "Domínio: ${BLUE}$DOMAIN${NC}"
echo ""

# Instalar Certbot
echo -e "${YELLOW}[1/3] Instalando Certbot...${NC}"
apt-get update -y
apt-get install -y certbot python3-certbot-nginx
echo -e "${GREEN}  ✓ Certbot instalado${NC}"

# Solicitar email
echo ""
read -p "Digite seu email para notificações do SSL: " email
if [ -z "$email" ]; then
    email="admin@$DOMAIN"
fi

# Obter certificado
echo ""
echo -e "${YELLOW}[2/3] Obtendo certificado SSL...${NC}"
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email "$email" --redirect
echo -e "${GREEN}  ✓ Certificado obtido${NC}"

# Configurar renovação automática
echo -e "${YELLOW}[3/3] Configurando renovação automática...${NC}"
systemctl enable certbot.timer
systemctl start certbot.timer
echo -e "${GREEN}  ✓ Renovação automática configurada${NC}"

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗"
echo -e "║${NC}          ${GREEN}SSL CONFIGURADO COM SUCESSO!${NC}                   ${CYAN}║"
echo -e "╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Site disponível em: ${GREEN}https://$DOMAIN${NC}"
echo -e "Painel Admin: ${GREEN}https://$DOMAIN/admin${NC}"
echo ""
echo -e "${BLUE}O certificado será renovado automaticamente.${NC}"
echo ""
