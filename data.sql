SET search_path = "Jardin";

INSERT INTO Jardin 
        (JardinId, Nom, SurfaceJardin, PotagerFlag, TypeSol, VergerFlag, HauteurMaximal, OrnementFlag) 
    VALUES 
        (1, 'JardinPotager', 5000, TRUE, 'argileux', FALSE, 10, FALSE),
        (2, 'JardinVerger', 10000, FALSE, 'terre', TRUE, 15, FALSE),
        (3, 'JardinOrnement', 7000, FALSE, 'terre', FALSE, 12, TRUE);

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
        (3, 4300, 8600, 2);

INSERT INTO RangJachere
        (JardinId, XParcelle, YParcelle, NumeroRang, DebutJachere)
    VALUES
        (1, 10000, 20000, 2, 20022-01-01),
        (2, 5000, 3200, 1, 2021-12-31),
        (3, 4300, 8600, 1, 2022-03-18);

INSERT INTO Variete
        (VarieteId, NomVariete, AnneeMiseEnMarche, DescriptionPlantation, 
        DescriptionEntretien, DescriptionSemis, DescriptionRecolte, 
        PeriodeMisePlace, PeriodeRecolte, Commentaire, SolsBiensAdaptes)
    VALUES
        (1, Tuberosum, 1980, 'légume tige', 'Arroser à chaque jour', 'culture vivrière',
         'À complète maturité, lorsque le feuillage commence à se faner',
         "Toute l'année", "Toute l'année", 'Est une patate', 'Sol léger et légèrement acide'),

INSERT INTO Plante
        (NomLatin, VarieteId, Categorie, Type, SousType)
    VALUES
        ()