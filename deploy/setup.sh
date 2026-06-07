#!/bin/bash
# Run this ONCE on the server to prepare it for deployment.
# Usage: bash setup.sh
set -e

# Install PM2 globally if not present
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
  pm2 startup
fi

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
  apt-get update && apt-get install -y nginx
fi

# Copy nginx config
cp "$(dirname "$0")/nginx.conf" /etc/nginx/sites-available/gamesetmatch
ln -sf /etc/nginx/sites-available/gamesetmatch /etc/nginx/sites-enabled/gamesetmatch
nginx -t && systemctl reload nginx

# Set up app directory
mkdir -p /var/www/gamesetmatch

echo ""
echo "Server setup complete."
echo "Now add the following secrets to GitHub:"
echo "  SSH_HOST      — your server IP or hostname"
echo "  SSH_USER      — SSH user (e.g. root or ubuntu)"
echo "  SSH_PRIVATE_KEY — contents of your private SSH key (~/.ssh/id_rsa)"
echo ""
echo "Then push to the branch to trigger the first deploy."
echo ""
echo "For HTTPS, run:  certbot --nginx -d gamesetmatch.cuppatea.org"
