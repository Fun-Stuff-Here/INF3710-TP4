DROP SCHEMA IF EXISTS  "Jardin" CASCADE;
CREATE SCHEMA "Jardin";

SET search_path = "Jardin";

CREATE TABLE Jardin (
	JardinId VARCHAR(10),
	Nom VARCHAR(20),
	SurfaceJardin NUMERIC(9,3),
	PotagerFlag BOOLEAN DEFAULT FALSE,
	TypeSol VARCHAR(20),
	VergerFlag BOOLEAN DEFAULT FALSE,
	HauteurMaximal NUMERIC(6,3),
	OrnementFlag BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (JardinId)
);

CREATE TABLE Parcelle (
	JardinId VARCHAR(10),
	XParcelle NUMERIC(6,0),
	YParcelle NUMERIC(6,0),
	Largeur NUMERIC(9,3),
	Longueur NUMERIC(9,3),
	PRIMARY KEY (JardinId, XParcelle, YParcelle),
	FOREIGN KEY (JardinId) REFERENCES Jardin(JardinId) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT mesurePositive CHECK (Largeur>0 AND Longueur>0)
);

CREATE TABLE Rang(
	JardinId VARCHAR(10),
	XParcelle NUMERIC(6,0),
	YParcelle NUMERIC(6,0),
	NumeroRang SERIAL,
	XRang NUMERIC(6,0),
	YRang NUMERIC(6,0),
	PRIMARY KEY (JardinId, XParcelle, YParcelle, NumeroRang),
	FOREIGN KEY (JardinId,XParcelle, YParcelle) REFERENCES Parcelle(JardinId, XParcelle, YParcelle) ON UPDATE CASCADE ON DELETE CASCADE
	
);

CREATE TABLE RangCultive(
	JardinId VARCHAR(10),
	XParcelle NUMERIC(6,0),
	YParcelle NUMERIC(6,0),
	NumeroRang SERIAL,
	PRIMARY KEY (JardinId, XParcelle, YParcelle, NumeroRang),
	FOREIGN KEY (JardinId, XParcelle, YParcelle, NumeroRang) REFERENCES Rang(JardinId, XParcelle, YParcelle, NumeroRang) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE RangJachere(
	JardinId VARCHAR(10),
	XParcelle NUMERIC(6,0),
	YParcelle NUMERIC(6,0),
	NumeroRang SERIAL,
	DebutJachere DATE,
	PRIMARY KEY (JardinId, XParcelle, YParcelle, NumeroRang),
	FOREIGN KEY (JardinId, XParcelle, YParcelle, NumeroRang) REFERENCES Rang(JardinId, XParcelle, YParcelle, NumeroRang) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT JachereTropLong 
	CHECK (DATE_PART('days',DebutJachere) -DATE_PART('days',current_date) <365)

);


CREATE TABLE Variete(
	VarieteId SERIAL,
	NomVariete VARCHAR(30),
	AnneeMiseEnMarche NUMERIC(4,0),
	DescriptionPlantation TEXT,
	DescriptionEntretien TEXT,
	DescriptionSemis TEXT,
	DescriptionRecolte TEXT,
	PeriodeMisePlace TEXT,
	PeriodeRecolte TEXT,
	Commentaire TEXT,
	SolsBiensAdaptes TEXT,
	PRIMARY KEY (VarieteId)
);


CREATE TABLE Plante(
	NomLatin VARCHAR(30),
	VarieteId SERIAL,
	Categorie TEXT NOT NULL,
	Type TEXT NOT NULL,
	SousType TEXT,
	PRIMARY KEY(NomLatin),
	FOREIGN KEY (VarieteId) REFERENCES Variete(VarieteId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE MiseEnPlace(
	NomLatin VARCHAR(30),
	JardinId VARCHAR(10),
	XParcelle NUMERIC(6,0),
	YParcelle NUMERIC(6,0),
	NumeroRang SERIAL,
	MiseEnPlace TEXT,
	estBiologique BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (NomLatin,JardinId, XParcelle,YParcelle,NumeroRang),
	FOREIGN KEY (NomLatin) REFERENCES Plante(NomLatin) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (JardinId,XParcelle, YParcelle, NumeroRang) REFERENCES Rang(JardinId,XParcelle, YParcelle, NumeroRang) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Compagnonnage(
	Plante VARCHAR(30),
	PlanteAccompagnee VARCHAR(30),
	Benefice TEXT,
	Inconvenient TEXT,
	PRIMARY KEY (Plante, PlanteAccompagnee),
	FOREIGN KEY (Plante) REFERENCES Plante(NomLatin) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (PlanteAccompagnee) REFERENCES Plante(NomLatin) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE Menace(
	MenaceId SERIAL,
	Description TEXT,
	SolutionsPossibles TEXT,	
	PRIMARY KEY (MenaceId)
);

CREATE TABLE SubirMenace(
	Plante VARCHAR(30),
	MenaceId SERIAL,
	PRIMARY KEY (MenaceId,Plante),
	FOREIGN KEY (Plante) REFERENCES Plante(NomLatin) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (MenaceId) REFERENCES Menace(MenaceId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Semencier(
	Nom VARCHAR(20),
	SiteWeb TEXT,
	PRIMARY KEY (nom)
);

CREATE TABLE ProduitSemence(
	Semencier VARCHAR(20),
	VarieteId SERIAL,
	EstBiologique BOOLEAN,
	PRIMARY KEY(Semencier,VarieteId),
	FOREIGN KEY (Semencier) REFERENCES Semencier(nom) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (VarieteId) REFERENCES Variete(VarieteId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE VIEW VueRangCultive
AS SELECT * FROM RangCultive NATURAL JOIN RANG;

CREATE VIEW VueRangJachere
AS SELECT * FROM RangJachere NATURAL JOIN RANG;

CREATE VIEW PlanteRang
AS SELECT * FROM 
Plante NATURAL JOIN MiseEnPlace NATURAL JOIN VueRangCultive;

CREATE VIEW JardinAugmente
AS SELECT * FROM 
Rang NATURAL JOIN Parcelle NATURAL JOIN Jardin;

CREATE VIEW VueRang
AS SELECT * FROM
VueRangCultive NATURAL FULL JOIN VueRangJachere;

CREATE VIEW PlanteVariete
AS SELECT * FROM
Variete NATURAL JOIN Plante;

CREATE VIEW PlanteMenace
AS SELECT * FROM
Menace NATURAL JOIN SubirMenace NATURAL JOIN Plante;
