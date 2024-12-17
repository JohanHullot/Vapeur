# Vapeur 
done by [Johan Hullot](https://github.com/JohanHullot)

Bienvenue sur Vapeur!!
Le site web qui répertorie n'importe quel jeux !


# Requis
NodeJs

# Utilisation

Dans l'invite de commande (CMD)

- Copiez l'url de l'endroit ou vous voulez cloner le git :
```bash
cd C:\VotreDossier
```
- Clonez le dossier git :
```bash
git clone https://github.com/JohanHullot/Vapeur.git
```

- Entrer dans le dossier Vapeur
```bash
cd Vapeur
```

- Installez Express : 
```bash
npm install express
```
- Création de la base de donnée : 
```bash
npx prisma migrate dev
```
- Implémentation de données par défault dans la base
```bash
npm run seed
```
- Vous pouvez maintenant démarrer le serveur : 
```bash
npm start
```
- Le serveur en marche lancez l'url http://localhost:3015/ sur votre navigateur
