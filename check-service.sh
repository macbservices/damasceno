#!/bin/bash

# ============================================
# Verificar Status - Damasceno Digital Tech
# ============================================

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
echo "║             STATUS DOS SERVIÇOS                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar PM2
echo -e "${YELLOW}[PM2 - Aplicação]${NC}"
if pm2 list 2>/dev/null | grep -q "$APP_NAME"; then
    pm2_info=$(pm2 jlist 2>/dev/null | python3 -c "import sys, json; data = json.load(sys.stdin); app = next((a for a in data if a['name'] == '$APP_NAME'), None); print(f\"{app['pm2_env']['status']}|{app.get('monit', {}).get('memory', 0)}|{app.get('monit', {}).get('cpu', 0)}|{app['pm2_env'].get('restart_time', 0)}\")" 2>/dev/null || echo "unknown|0|0|0")
    
    IFS='|' read -r status memory cpu restarts <<< "$pm2_info"
    
    if [ "$status" = "online" ]; then
        echo -e "  Status: ${GREEN}● Online${NC}"
    else
        echo -e "  Status: ${RED}● $status${NC}"
    fi
    
    memory_mb=$((memory / 1024 / 1024))
    echo -e "  Memória: ${BLUE}${memory_mb}MB${NC}"
    echo -e "  CPU: ${BLUE}${cpu}%${NC}"
    echo -e "  Reinícios: ${BLUE}${restarts}${NC}"
else
    echo -e "  Status: ${RED}● Não encontrado${NC}"
fi

# Verificar Nginx
echo ""
echo -e "${YELLOW}[Nginx - Proxy Reverso]${NC}"
if systemctl is-active --quiet nginx 2>/dev/null; then
    echo -e "  Status: ${GREEN}● Ativo${NC}"
else
    echo -e "  Status: ${RED}● Inativo${NC}"
fi

# Verificar porta 3000
echo ""
echo -e "${YELLOW}[Porta 3000]${NC}"
if ss -tuln 2>/dev/null | grep -q ":3000 "; then
    echo -e "  Status: ${GREEN}● Em uso${NC}"
else
    echo -e "  Status: ${RED}● Livre (possível problema)${NC}"
fi

# Verificar diretório de dados
echo ""
echo -e "${YELLOW}[Armazenamento de Dados]${NC}"
if [ -d "$APP_DIR/data" ]; then
    echo -e "  Diretório: ${GREEN}● Existe${NC}"
    
    settings_size=$(du -h "$APP_DIR/data/settings.json" 2>/dev/null | cut -f1 || echo "N/A")
    services_size=$(du -h "$APP_DIR/data/services.json" 2>/dev/null | cut -f1 || echo "N/A")
    
    echo -e "  settings.json: ${BLUE}$settings_size${NC}"
    echo -e "  services.json: ${BLUE}$services_size${NC}"
else
    echo -e "  Diretório: ${RED}● Não existe${NC}"
fi

# Verificar uploads
echo ""
echo -e "${YELLOW}[Uploads]${NC}"
if [ -d "$APP_DIR/public/uploads" ]; then
    upload_count=$(ls -1 "$APP_DIR/public/uploads" 2>/dev/null | wc -l)
    upload_size=$(du -sh "$APP_DIR/public/uploads" 2>/dev/null | cut -f1 || echo "N/A")
    echo -e "  Arquivos: ${BLUE}$upload_count${NC}"
    echo -e "  Tamanho total: ${BLUE}$upload_size${NC}"
else
    echo -e "  Diretório: ${RED}● Não existe${NC}"
fi

# Espaço em disco
echo ""
echo -e "${YELLOW}[Disco]${NC}"
disk_usage=$(df -h /var/www 2>/dev/null | tail -1 | awk '{print $5}')
disk_avail=$(df -h /var/www 2>/dev/null | tail -1 | awk '{print $4}')
echo -e "  Uso: ${BLUE}$disk_usage${NC}"
echo -e "  Disponível: ${BLUE}$disk_avail${NC}"

# Últimos logs
echo ""
echo -e "${YELLOW}[Últimos Logs]${NC}"
echo -e "${BLUE}─────────────────────────────────────────────────────────────${NC}"
pm2 logs "$APP_NAME" --lines 5 --nostream 2>/dev/null || echo "  Logs não disponíveis"
echo -e "${BLUE}─────────────────────────────────────────────────────────────${NC}"

echo ""
