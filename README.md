# Damasceno Digital Tech - Site Institucional

Site institucional para a empresa Damasceno Digital Tech, especializada em manutenção de equipamentos eletrônicos.

## Características

- Site institucional responsivo e moderno com design futurista
- Painel administrativo completo (oculto em /admin)
- Gerenciamento de serviços (adicionar, editar, remover)
- Personalização de cores do tema
- Edição de todos os textos do site
- Upload de logo personalizada
- Salvamento em arquivos JSON locais (sem necessidade de banco de dados)
- Execução persistente com PM2
- Auto-start após reinicialização da VPS

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- PM2 (gerenciador de processos)
- Nginx (proxy reverso)

## Instalação Rápida em VPS

### Instalação Automatizada (Recomendado)

Execute um único comando para instalar tudo automaticamente:

```bash
sudo REPO_URL=https://github.com/macbservices/Damasceno.git DOMAIN=seu-dominio.com.br bash -c "$(curl -fsSL https://raw.githubusercontent.com/macbservices/Damasceno/main/install.sh)"
```

**Exemplo com domínio:**

```bash
sudo REPO_URL=https://github.com/macbservices/Damasceno.git DOMAIN=eletronica.damascenodigitaltech.com.br bash -c "$(curl -fsSL https://raw.githubusercontent.com/macbservices/Damasceno/main/install.sh)"
```

**Sem domínio (acesso por IP):**

```bash
sudo REPO_URL=https://github.com/macbservices/Damasceno.git bash -c "$(curl -fsSL https://raw.githubusercontent.com/macbservices/Damasceno/main/install.sh)"
```

### Requisitos do Servidor

- Ubuntu 20.04+ ou Debian 11+
- Mínimo 1GB RAM
- Mínimo 10GB de espaço em disco
- Acesso root (sudo)

## Instalação Manual

### 1. Instalar Node.js 20.x

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Instalar PM2, Nginx e Git

```bash
sudo npm install -g pm2
sudo apt-get install -y nginx git
```

### 3. Clonar o repositório

```bash
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/macbservices/Damasceno.git damasceno-eletronica
cd damasceno-eletronica
```

### 4. Instalar dependências e construir

```bash
sudo npm install
sudo npm run build
```

### 5. Criar diretórios de dados

```bash
sudo mkdir -p data public/uploads
sudo chmod -R 755 data public/uploads
```

### 6. Configurar PM2

```bash
sudo pm2 start npm --name "damasceno-eletronica" -- start
sudo pm2 save
sudo pm2 startup
```

### 7. Configurar Nginx

Crie o arquivo `/etc/nginx/sites-available/damasceno-eletronica`:

```nginx
server {
    listen 80;
    server_name seu-dominio.com.br;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ative o site:

```bash
sudo ln -s /etc/nginx/sites-available/damasceno-eletronica /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Gerenciamento

### Menu Interativo

```bash
sudo bash /var/www/damasceno-eletronica/menu.sh
```

### Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `pm2 logs damasceno-eletronica` | Ver logs em tempo real |
| `pm2 restart damasceno-eletronica` | Reiniciar o site |
| `pm2 stop damasceno-eletronica` | Parar o site |
| `pm2 status` | Ver status dos processos |

### Verificar Status

```bash
sudo bash /var/www/damasceno-eletronica/check-service.sh
```

### Atualizar o Site

```bash
sudo bash /var/www/damasceno-eletronica/update.sh
```

### Configurar SSL (HTTPS)

```bash
sudo bash /var/www/damasceno-eletronica/setup-ssl.sh
```

## Painel Administrativo

Acesse `/admin` para gerenciar o site.

**Credenciais padrão:**
- Usuário: `admin`
- Senha: `admin123`

**IMPORTANTE:** Altere a senha após o primeiro acesso!

### Funcionalidades do Admin

- **Geral**: Nome da empresa, WhatsApp, email, endereço
- **Serviços**: Adicionar, editar, remover e reordenar serviços com imagens
- **Textos**: Editar todos os textos do site (hero, sobre, diferenciais, contato)
- **Cores**: Personalizar todas as cores do tema
- **Logo**: Upload de nova logo e favicon
- **Segurança**: Alterar senha de acesso

## Estrutura dos Dados

Os dados são salvos em arquivos JSON na pasta `/data`:

```
data/
├── settings.json  # Configurações gerais do site
├── services.json  # Lista de serviços
└── admin.json     # Credenciais do admin (hash bcrypt)
```

## Estrutura do Projeto

```
damasceno-eletronica/
├── app/                    # Páginas Next.js
│   ├── page.tsx           # Página inicial
│   ├── admin/             # Painel administrativo
│   └── api/               # APIs do admin
├── components/            # Componentes React
│   ├── header.tsx
│   ├── hero.tsx
│   ├── services.tsx
│   └── admin/             # Componentes do admin
├── lib/                   # Utilitários
│   ├── data.ts           # Funções de leitura/escrita
│   ├── auth.ts           # Autenticação
│   └── types.ts          # Tipos TypeScript
├── data/                  # Dados JSON (criado automaticamente)
├── public/               # Arquivos estáticos
│   └── uploads/          # Uploads de imagens
├── install.sh            # Script de instalação
├── menu.sh               # Menu interativo
├── update.sh             # Script de atualização
├── setup-ssl.sh          # Configurar HTTPS
└── check-service.sh      # Verificar status
```

## Suporte

Em caso de problemas, verifique:

1. Os logs do PM2: `pm2 logs damasceno-eletronica`
2. Os logs do Nginx: `sudo tail -f /var/log/nginx/error.log`
3. Se as portas estão abertas: `sudo ufw status`

## Licença

MIT
