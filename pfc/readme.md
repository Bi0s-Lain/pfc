# Le glorieux jeu de pierre-feuille-ciseaux

## Intro

Depuis la nuit des temps (surtout chez les Incas), les gens ont essayé de se départager. Au début, ils tiraient à la courte paille, ensuite a été inventé le vote à main levée. Plus récemment, on a inventé les ciseaux (bien pratiques pour couper le papier et d'autres matières fines). De ce fait, a pu être découvert le célèbre jeu du pierre-feuille-ciseaux. Ce dernier est une abstraction complexe qui vise à créer des hiérarchies entre des symboles que les deux joueurs effectuent avec leurs mains en mimant une pierre, une feuille ou des ciseaux. La hiérarchie entre ces symboles est assez complexe :

- la pierre bat les ciseaux,
- la feuille bat la pierre, 
- et les ciseaux coupent la feuille.

Afin de moderniser le concept, on nous a proposé de faire un portage "next-gen" de ce jeu. Cela a pu être réalisé grâce à la puissance de Webpack®™ et Node©™.

## Réalisation artistique

Les images du dossier images ont été réalisées par mes soins sur Aseprite. Le CSS rétro vient de GitHub (je pense que c'était bien mieux avant).

## Lancer le projet :

Lancer le client :

```Bash
cd client 
npm install
npm run watch
```

Lancer le serveur :

```Bash
cd server
npm install
nodemon
```

## Accéder au site

Le projet sera accessible sur l'adresse locale du PC 127.0.0.1 sur le port 8080, [ou dispo ici](http://127.0.0.1:8080/).