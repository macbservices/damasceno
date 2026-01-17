#!/bin/bash

# ============================================
# Menu Interativo - Damasceno Digital Tech
# ============================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

APP_NAME="damasceno-eletronica"
APP_DIR="/var/www/$APP_NAME"

show_banner() {
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
    echo "║                   Menu de Gerenciamento                   ║"
    echo "║                                                           ║"
    echo "╚═══════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

show_status() {
    echo -e "${YELLOW}Status Atual:${NC}"
    
    # PM2 Status
    if pm2 list 2>/dev/null | grep -q "$APP_NAME"; then
        pm2_status=$(pm2 jlist 2>/dev/null | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)
        if [ "$pm2_status" = "online" ]; then
            echo -e "  PM2: ${GREEN}● Online${NC}"
        else
            echo -e "  PM2: ${RED}● $pm2_status${NC}"
        fi
    else
        echo -e "  PM2: ${RED}● Não encontrado${NC}"
    fi
    
    # Nginx Status
    if systemctl is-active --quiet nginx 2>/dev/null; then
        echo -e "  Nginx: ${GREEN}● Ativo${NC}"
    else
        echo -e "  Nginx: ${RED}● Inativo${NC}"
    fi
    
    echo ""
}

show_menu() {
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "  ${GREEN}1)${NC} Reiniciar Site"
    echo -e "  ${GREEN}2)${NC} Parar Site"
    echo -e "  ${GREEN}3)${NC} Iniciar Site"
    echo -e "  ${GREEN}4)${NC} Ver Logs (tempo real)"
    echo -e "  ${GREEN}5)${NC} Ver Status Completo"
    echo -e "  ${GREEN}6)${NC} Atualizar do GitHub"
    echo -e "  ${GREEN}7)${NC} Configurar SSL (HTTPS)"
    echo -e "  ${GREEN}8)${NC} Fazer Backup"
    echo -e "  ${GREEN}9)${NC} Restaurar Backup"
    echo -e "  ${GREEN}0)${NC} Sair"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo ""
}

restart_site() {
    echo -e "${YELLOW}Reiniciando site...${NC}"
    pm2 restart "$APP_NAME"
    echo -e "${GREEN}Site reiniciado com sucesso!${NC}"
    sleep 2
}

stop_site() {
    echo -e "${YELLOW}Parando site...${NC}"
    pm2 stop "$APP_NAME"
    echo -e "${GREEN}Site parado!${NC}"
    sleep 2
}

start_site() {
    echo -e "${YELLOW}Iniciando site...${NC}"
    pm2 start "$APP_NAME" 2>/dev/null || pm2 start npm --name "$APP_NAME" -- start
    echo -e "${GREEN}Site iniciado!${NC}"
    sleep 2
}

view_logs() {
    echo -e "${YELLOW}Exibindo logs (CTRL+C para sair)...${NC}"
    echo ""
    pm2 logs "$APP_NAME"
}

view_status() {
    bash "$APP_DIR/check-service.sh"
    echo ""
    read -p "Pressione ENTER para voltar ao menu..."
}

update_site() {
    echo -e "${YELLOW}Iniciando atualização...${NC}"
    bash "$APP_DIR/update.sh"
    echo ""
    read -p "Pressione ENTER para voltar ao menu..."
}

setup_ssl() {
    echo ""
    read -p "Digite seu domínio (ex: eletronica.seusite.com.br): " domain
    if [ -n "$domain" ]; then
        bash "$APP_DIR/setup-ssl.sh" "$domain"
    else
        echo -e "${RED}Domínio não informado!${NC}"
    fi
    echo ""
    read -p "Pressione ENTER para voltar ao menu..."
}

make_backup() {
    echo -e "${YELLOW}Fazendo backup...${NC}"
    BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
    BACKUP_DIR="$APP_DIR/backups/$BACKUP_NAME"
    mkdir -p "$BACKUP_DIR"
    
    if [ -d "$APP_DIR/data" ]; then
        cp -r "$APP_DIR/data" "$BACKUP_DIR/"
    fi
    if [ -d "$APP_DIR/public/uploads" ]; then
        cp -r "$APP_DIR/public/uploads" "$BACKUP_DIR/"
    fi
    
    echo -e "${GREEN}Backup salvo em: $BACKUP_DIR${NC}"
    sleep 2
}

restore_backup() {
    echo ""
    echo -e "${YELLOW}Backups disponíveis:${NC}"
    echo ""
    
    if [ -d "$APP_DIR/backups" ]; then
        backups=($(ls -1 "$APP_DIR/backups" 2>/dev/null))
        if [ ${#backups[@]} -eq 0 ]; then
            echo -e "${RED}Nenhum backup encontrado!${NC}"
            sleep 2
            return
        fi
        
        for i in "${!backups[@]}"; do
            echo -e "  ${GREEN}$((i+1)))${NC} ${backups[$i]}"
        done
        
        echo ""
        read -p "Escolha o número do backup (0 para cancelar): " choice
        
        if [ "$choice" -gt 0 ] && [ "$choice" -le ${#backups[@]} ]; then
            selected="${backups[$((choice-1))]}"
            BACKUP_DIR="$APP_DIR/backups/$selected"
            
            echo -e "${YELLOW}Restaurando $selected...${NC}"
            
            if [ -d "$BACKUP_DIR/data" ]; then
                cp -r "$BACKUP_DIR/data"/* "$APP_DIR/data/" 2>/dev/null || true
            fi
            if [ -d "$BACKUP_DIR/uploads" ]; then
                cp -r "$BACKUP_DIR/uploads"/* "$APP_DIR/public/uploads/" 2>/dev/null || true
            fi
            
            pm2 restart "$APP_NAME"
            echo -e "${GREEN}Backup restaurado com sucesso!${NC}"
        fi
    else
        echo -e "${RED}Pasta de backups não encontrada!${NC}"
    fi
    
    sleep 2
}

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Este script precisa ser executado como root (sudo)${NC}"
    exit 1
fi

# Loop principal
while true; do
    show_banner
    show_status
    show_menu
    
    read -p "Escolha uma opção: " option
    
    case $option in
        1) restart_site ;;
        2) stop_site ;;
        3) start_site ;;
        4) view_logs ;;
        5) view_status ;;
        6) update_site ;;
        7) setup_ssl ;;
        8) make_backup ;;
        9) restore_backup ;;
        0) 
            echo -e "${GREEN}Até logo!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Opção inválida!${NC}"
            sleep 1
            ;;
    esac
done
