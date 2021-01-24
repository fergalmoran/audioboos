#!/usr/bin/env bash

# script to create a self-signed key so your dev servers can run on https
# trust.sh will trust this key on arch
# ubuntu style apps use something like the below
#     certutil -d sql:$HOME/.pki/nssdb -A -t "C,," -n "My Self Signed CA" -i ./ca.crt

set -eu
org=audioboos-ca
domain=dev.audioboos.com

openssl genpkey -algorithm RSA -out ca.key
openssl req -x509 -key ca.key -out ca.crt \
    -subj "/CN=$org/O=$org"

openssl genpkey -algorithm RSA -out "$domain".key
openssl req -new -key "$domain".key -out "$domain".csr \
    -subj "/CN=$domain/O=$org"

openssl x509 -req -in "$domain".csr -days 365 -out "$domain".crt \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -extfile <(cat <<END
basicConstraints = CA:FALSE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
subjectAltName = DNS:$domain
END
    )

#generate pfx 
openssl pkcs12 -export -out "$domain".pfx -inkey "$domain".key -in "$domain".crt -password pass:secret

