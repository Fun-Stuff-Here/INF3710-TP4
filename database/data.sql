SET search_path = "Jardin";

INSERT INTO Jardin 
        (JardinId, Nom, SurfaceJardin, PotagerFlag, TypeSol, VergerFlag, HauteurMaximal, OrnementFlag) 
    VALUES 
        (1, 'JardinPotager', 5000, TRUE, 'argileux', FALSE, 10, FALSE),
        (2, 'JardinVerger', 10000, FALSE, 'terreau', TRUE, 15, FALSE),
        (3, 'JardinOrnement', 7000, FALSE, 'terreau', FALSE, 12, TRUE);

INSERT INTO Parcelle
        (JardinId, XParcelle, YParcelle, Largeur, Longueur)
    VALUES
        (1, 10000, 20000, 150, 1000),
        (2, 5000, 3200, 2000, 500),
        (3, 4300, 8600, 300, 700);

INSERT INTO Rang
        (JardinId, XParcelle, YParcelle, NumeroRang, XRang, YRang)
    VALUES
        (1, 10000, 20000, 1, 10, 25),
        (1, 10000, 20000, 2, 45, 70),
        (1, 10000, 20000, 3, 100, 10),
        (2, 5000, 3200, 1, 25, 25),
        (3, 4300, 8600, 1, 200, 540),
        (3, 4300, 8600, 2, 600, 195);

INSERT INTO RangCultive
        (JardinId, XParcelle, YParcelle, NumeroRang)
    VALUES
        (1, 10000, 20000, 1),
        (1, 10000, 20000, 3),
        (2, 5000, 3200, 2);

INSERT INTO RangJachere
        (JardinId, XParcelle, YParcelle, NumeroRang, DebutJachere)
    VALUES
        (1, 10000, 20000, 2, 20022-01-01),
        (3, 4300, 8600, 1, 2021-12-31),
        (3, 4300, 8600, 2, 2022-03-18);

INSERT INTO Variete
        (VarieteId, NomVariete, AnneeMiseEnMarche, DescriptionPlantation, 
        DescriptionEntretien, DescriptionSemis, DescriptionRecolte, 
        PeriodeMisePlace, PeriodeRecolte, Commentaire, SolsBiensAdaptes)
    VALUES
        (   
            1,
            'Tuberosum',
            1980,
            'Légume tige',
            'Arroser à chaque jour',
            'culture vivrière',
            'À complète maturité, lorsque le feuillage commence à se faner',
            "Toute l'année", "Toute l'année",
            'Est une patate',
            'Sol léger et légèrement acide'
        ),
        (
            2,
            'Amélanchier du Canada',
            1983, 
            "Dure plusieures années, Peu de fertilisation, 4 litres d'eau par semaine",
            'Multiplication par semis est peu dispandieuse et efficace',
            'Récolte manuelle ou mécanique',
            "Toute l'année",
            'Dès Juin',
            'Fleurs blanche qui créé des baies',
            'Sol bien drainé, préférablement un terreau ou terreau sableux avec un taux de matière organique entre 2% et 3% et un pH entre 6 et 7'
        ),
        (
            3,
            "Calabrais hâtif",
            1995,
            'Planter sous environ 5 centimètres de terre, levée en 8 jours',
            'Arroser régulièrement, effectuer une rotation tous les 5 à 6 ans',
            '1 centimètre de profondeur à environ 22 degrés celsius et dans un endroit ensoleillé',
            'Il faut attendre 1 mois à 1 mois et demi',
            "Début de l'été",
            "Fin de l'été",
            "Légume originaire de l'Italie",
            'Terreau humide, riche, mais pas acide'
        ),
        (
            4,
            'Adiantum',
            1977,
            'Lumière filtrée et indirecte',
            'Humidité élevée et bonne aération, donc vaporiser quotidiennement',
            'Se cultive devant une fenêtre exposée au Nord',
            'Enlever les vieilles frindes sèches',
            'Au printemps',
            'Au printemps',
            "Peut atteindre jusqu'à 40 centimètres de hauteur",
            'À part égale de terreau, sable et tourbe'
        );

INSERT INTO Plante
        (NomLatin, VarieteId, Categorie, Type, SousType)
    VALUES
        ('Solanum tuberosum', 1, 'Racine', 'Plante herbacée', 'Légume racine'),
        ('Amelanchier canadensis', 2, 'Fleur', 'Arbre fruitier', 'Baie'),
        ('Brassica oleracea italica', 3, 'Fleur', 'Plante herbacée', 'Légume fleur'),
        ('Capillaire', 4, 'Vivace', 'Fougère', "Fougère d'intérieur");


INSERT INTO MiseEnPlace
        (NomLatin, JardinId, XParcelle, YParcelle, NumeroRang, MiseEnPlace)
    VALUES
        ('Solanum tuberosum', 1, 10000, 20000, 1, 'semis',TRUE),
        ('Amelanchier canadensis', 2, 5000, 3200, 1, 'plant'),
        ('Brassica oleracea italica', 1, 10000, 20000, 1, 'greffe',TRUE),
        ('Adiantum', 3, 4300, 8600, 'transplanter',TRUE);


INSERT INTO Compagnonnage
        (Plante, PlanteAccompagnee, Benefice, Inconvenient)
    VALUES
        ('Solanum tuberosum', 'Brassica oleracea italica', 'Éloigne les mouches', '');

INSERT INTO Menace
        (MenaceId, Description, SolutionsPossibles)
    VALUES
        (1, 'Ravager par des insectes', 'Placer un filet anti-insecte'),
        (2, 'Ravager par des cochenilles', "Passer les feuilles envahies sous un jet d'eau puissant");

INSERT INTO SubirMenace
        (Plante, MenaceId)
    VALUES
        ('Brassica oleracea italica', 1),
        ('Adiantum', 2);

INSERT INTO Semencier
        (Nom, SiteWeb)
    VALUES
        ('La Semence Bio', 'https://www.lasemencebio.com/');

INSERT INTO ProduitSemence
        (Semencier, VarieteId, EstBiologique)
    VALUES
        ('La Semence Bio', 3, TRUE);