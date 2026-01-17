#!/bin/bash

# ============================================
# Script de Instalação - Damasceno Digital Tech
# ============================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configurações
APP_NAME="damasceno-eletronica"
APP_DIR="/var/www/$APP_NAME"
REPO_URL="${REPO_URL:-https://github.com/macbservices/Damasceno.git}"
DOMAIN="${DOMAIN:-_}"
NODE_VERSION="20"

# Banner
clear
echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║     ██████╗  █████╗ ███╗   ███╗ █████╗ ███████╗ ██████╗   ║"
echo "║     ██╔══██╗██╔══██╗████╗ ████║██╔══██╗██╔════╝██╔════╝   ║"
echo "║     ██║  ██║███████║██╔████╔██║███████║███████╗██║        ║"
echo "║     ██║  ██║██╔══██║██║╚██╔╝██║██╔══██║╚════██║██║        ║"
echo "║     ██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████║╚██████╗   ║"
echo "║     ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝   ║"
echo "║                                                           ║"
echo "║              DIGITAL TECH - ELETRÔNICA                    ║"
echo "║                  Script de Instalação                     ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}[ERRO] Este script precisa ser executado como root (sudo)${NC}"
    exit 1
fi

# Função para verificar se um comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Mostrar configurações
echo -e "${BLUE}Configurações da instalação:${NC}"
echo -e "  Repositório: ${YELLOW}$REPO_URL${NC}"
echo -e "  Domínio: ${YELLOW}$DOMAIN${NC}"
echo -e "  Diretório: ${YELLOW}$APP_DIR${NC}"
echo ""
read -p "Pressione ENTER para continuar ou CTRL+C para cancelar..."
echo ""

# 1. Atualizar sistema
echo -e "${YELLOW}[1/8] Atualizando sistema...${NC}"
apt-get update -y
apt-get upgrade -y
echo -e "${GREEN}[OK] Sistema atualizado${NC}"
echo ""

# 2. Instalar Node.js
echo -e "${YELLOW}[2/8] Instalando Node.js ${NODE_VERSION}.x...${NC}"
if ! command_exists node; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt-get install -y nodejs
else
    echo -e "${BLUE}Node.js já instalado${NC}"
fi
echo -e "${GREEN}[OK] Node.js $(node --version) instalado${NC}"
echo ""

# 3. Instalar PM2
echo -e "${YELLOW}[3/8] Instalando PM2...${NC}"
if ! command_exists pm2; then
    npm install -g pm2
else
    echo -e "${BLUE}PM2 já instalado${NC}"
fi
echo -e "${GREEN}[OK] PM2 instalado${NC}"
echo ""

# 4. Instalar Nginx e Git
echo -e "${YELLOW}[4/8] Instalando Nginx e Git...${NC}"
apt-get install -y nginx git
echo -e "${GREEN}[OK] Nginx e Git instalados${NC}"
echo ""

# 5. Clonar repositório
echo -e "${YELLOW}[5/8] Clonando repositório...${NC}"
mkdir -p /var/www
if [ -d "$APP_DIR" ]; then
    echo -e "${YELLOW}Diretório existente encontrado. Fazendo backup...${NC}"
    BACKUP_DIR="${APP_DIR}_backup_$(date +%Y%m%d_%H%M%S)"
    mv "$APP_DIR" "$BACKUP_DIR"
    # Preservar dados do backup
    if [ -d "$BACKUP_DIR/data" ]; then
        echo -e "${BLUE}Dados existentes serão preservados${NC}"
    fi
fi
git clone "$REPO_URL" "$APP_DIR"
cd "$APP_DIR"

# Restaurar dados do backup se existir
if [ -d "$BACKUP_DIR/data" ]; then
    cp -r "$BACKUP_DIR/data" "$APP_DIR/"
    echo -e "${GREEN}[OK] Dados restaurados do backup${NC}"
fi
if [ -d "$BACKUP_DIR/public/uploads" ]; then
    mkdir -p "$APP_DIR/public"
    cp -r "$BACKUP_DIR/public/uploads" "$APP_DIR/public/"
    echo -e "${GREEN}[OK] Uploads restaurados do backup${NC}"
fi

echo -e "${GREEN}[OK] Repositório clonado${NC}"
echo ""

# 6. Instalar dependências e construir
echo -e "${YELLOW}[6/8] Instalando dependências e construindo...${NC}"
npm install
npm run build

# Criar diretório de dados
mkdir -p "$APP_DIR/data"
mkdir -p "$APP_DIR/public/uploads"
chmod -R 755 "$APP_DIR/data"
chmod -R 755 "$APP_DIR/public/uploads"
echo -e "${GREEN}[OK] Build concluído${NC}"
echo ""

# 7. Configurar PM2
echo -e "${YELLOW}[7/8] Configurando PM2...${NC}"
pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 start npm --name "$APP_NAME" -- start
pm2 save
pm2 startup systemd -u root --hp /root
echo -e "${GREEN}[OK] PM2 configurado${NC}"
echo ""

# 8. Configurar Nginx
echo -e "${YELLOW}[8/8] Configurando Nginx...${NC}"

cat > /etc/nginx/sites-available/$APP_NAME << EOF
server {
    listen 80;
    server_name $DOMAIN;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    location /uploads {
        alias $APP_DIR/public/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Ativar site
ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

# Testar e recarregar Nginx
nginx -t
systemctl reload nginx
systemctl enable nginx
echo -e "${GREEN}[OK] Nginx configurado${NC}"
echo ""

# Configurar permissões dos scripts
chmod +x "$APP_DIR"/*.sh 2>/dev/null || true

# Configurar firewall (se UFW estiver instalado)
if command_exists ufw; then
    echo -e "${YELLOW}Configurando firewall...${NC}"
    ufw allow 'Nginx Full'
    ufw allow ssh
    ufw --force enable
    echo -e "${GREEN}[OK] Firewall configurado${NC}"
fi

# Finalização
echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║${NC}        ${GREEN}INSTALAÇÃO CONCLUÍDA COM SUCESSO!${NC}              ${CYAN}║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
if [ "$DOMAIN" != "_" ]; then
    echo -e "  Site disponível em: ${BLUE}http://$DOMAIN${NC}"
    echo -e "  Painel Admin: ${BLUE}http://$DOMAIN/admin${NC}"
else
    IP=$(curl -s ifconfig.me 2>/dev/null || echo "SEU_IP")
    echo -e "  Site disponível em: ${BLUE}http://$IP${NC}"
    echo -e "  Painel Admin: ${BLUE}http://$IP/admin${NC}"
fi
echo ""
echo -e "  ${YELLOW}Credenciais padrão:${NC}"
echo -e "    Usuário: ${GREEN}admin${NC}"
echo -e "    Senha: ${GREEN}admin123${NC}"
echo ""
echo -e "  ${RED}IMPORTANTE: Altere a senha após o primeiro acesso!${NC}"
echo ""
echo -e "  ${BLUE}Comandos úteis:${NC}"
echo -e "    Menu interativo: ${YELLOW}sudo bash $APP_DIR/menu.sh${NC}"
echo -e "    Ver logs: ${YELLOW}pm2 logs $APP_NAME${NC}"
echo -e "    Reiniciar: ${YELLOW}pm2 restart $APP_NAME${NC}"
echo -e "    Status: ${YELLOW}pm2 status${NC}"
echo ""
