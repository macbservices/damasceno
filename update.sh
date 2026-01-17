#!/bin/bash

# ============================================
# Script de Atualização - Damasceno Digital Tech
# ============================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

APP_NAME="damasceno-eletronica"
APP_DIR="/var/www/$APP_NAME"

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║          DAMASCENO DIGITAL TECH - ATUALIZAÇÃO             ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

cd "$APP_DIR"

# Backup dos dados
echo -e "${YELLOW}[1/5] Fazendo backup dos dados...${NC}"
BACKUP_DIR="$APP_DIR/backups/pre_update_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

if [ -d "data" ]; then
    cp -r data "$BACKUP_DIR/"
    echo -e "${GREEN}  ✓ Dados salvos${NC}"
fi
if [ -d "public/uploads" ]; then
    cp -r public/uploads "$BACKUP_DIR/"
    echo -e "${GREEN}  ✓ Uploads salvos${NC}"
fi

# Baixar atualizações
echo -e "${YELLOW}[2/5] Baixando atualizações do GitHub...${NC}"
git fetch origin
git reset --hard origin/main
echo -e "${GREEN}  ✓ Código atualizado${NC}"

# Restaurar dados
echo -e "${YELLOW}[3/5] Restaurando dados...${NC}"
if [ -d "$BACKUP_DIR/data" ]; then
    mkdir -p data
    cp -r "$BACKUP_DIR/data"/* data/ 2>/dev/null || true
    echo -e "${GREEN}  ✓ Dados restaurados${NC}"
fi
if [ -d "$BACKUP_DIR/uploads" ]; then
    mkdir -p public/uploads
    cp -r "$BACKUP_DIR/uploads"/* public/uploads/ 2>/dev/null || true
    echo -e "${GREEN}  ✓ Uploads restaurados${NC}"
fi

# Instalar dependências e construir
echo -e "${YELLOW}[4/5] Instalando dependências e construindo...${NC}"
npm install
npm run build
echo -e "${GREEN}  ✓ Build concluído${NC}"

# Reiniciar aplicação
echo -e "${YELLOW}[5/5] Reiniciando aplicação...${NC}"
pm2 restart "$APP_NAME"
echo -e "${GREEN}  ✓ Aplicação reiniciada${NC}"

# Limpar backups antigos (manter últimos 5)
echo -e "${YELLOW}Limpando backups antigos...${NC}"
cd "$APP_DIR/backups" 2>/dev/null && ls -1t | tail -n +6 | xargs rm -rf 2>/dev/null || true

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗"
echo -e "║${NC}        ${GREEN}ATUALIZAÇÃO CONCLUÍDA COM SUCESSO!${NC}              ${CYAN}║"
echo -e "╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
