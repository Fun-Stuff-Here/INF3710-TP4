DROP SCHEMA IF EXISTS  "Jardin" CASCADE;
CREATE SCHEMA "Jardin";

SET search_path = "Jardin";

CREATE TABLE JARDIN (
	JardinId VARCHAR(10),
	Nom VARCHAR(20),
	Surface NUMERIC(9,3),
	PotagerFlag BOOLEAN DEFAULT FALSE,
	TypeSol VARCHAR(20),
	VergerFlag BOOLEAN DEFAULT FALSE,
	HauteurMaximal NUMERIC(6,3),
	OrnementFlag BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (JardinId)
	/*ADD CONSTRAINT FOR PLANTS*/
);

CREATE TABLE Parcelle (
	JardinId VARCHAR(10),
	X NUMERIC(6,0),
	Y NUMERIC(6,0),
	Largeur NUMERIC(9,3),
	Longeur NUMERIC(9,3),
	PRIMARY KEY (JardinId, X, Y),
	FOREIGN KEY (JardinId) REFERENCES Jardin(JardinId) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT mesurePositive CHECK (Largeur>0 AND Longeur>0)
);

CREATE TABLE Rang(
	JardinId VARCHAR(10),
	XParcelle NUMERIC(6,0),
	YParcelle NUMERIC(6,0),
	NumeroRang SERIAL,
	DebutJachere DATE,
	X NUMERIC(6,0),
	Y NUMERIC(6,0),
	PRIMARY KEY (JardinId, XParcelle, YParcelle, NumeroRang),
	FOREIGN KEY (JardinId,XParcelle, YParcelle) REFERENCES Parcelle(JardinId, X,Y) ON UPDATE CASCADE ON DELETE CASCADE
	/*CONSTRAINT siJachereTropLong CHECK ((year(current_date) - year(DebutJachere))<1)*/
);

CREATE TABLE Variete(
	VarieteId SERIAL,
	Nom VARCHAR(20),
	AnneeMiseEnMarche NUMERIC(4,0),
	DescriptionPlantation TEXT,
	DescriptionEntretien TEXT,
	DescriptionSemis TEXT,
	DescriptionRecolte TEXT,
	PeriodeMisePlace TEXT,
	PeriodeRecolte TEXT,
	Commentaire TEXT,
	SolsBiensAdaptes TEXT,/*On ne sait pas quel type de donne a lui donner a lui*/
	PRIMARY KEY (VarieteId)
);


CREATE TABLE Plante(
	NomLatin VARCHAR(20),
	VarieteId SERIAL,
	Categorie VARCHAR(20) NOT NULL,
	Type VARCHAR(20) NOT NULL,
	SousType VARCHAR(20),
	PRIMARY KEY(NomLatin),
	FOREIGN KEY (VarieteId) REFERENCES Variete(VarieteId)
);

CREATE TABLE Compagnonnage(
	Plante VARCHAR(20),
	PlanteAccompagnee VARCHAR(20),
	Benifice TEXT,
	Inconvenient TEXT,
	PRIMARY KEY (Plante, PlanteAccompagnee),
	FOREIGN KEY (Plante) REFERENCES Plante(NomLatin),
	FOREIGN KEY (PlanteAccompagnee) REFERENCES Plante(NomLatin)
);


CREATE TABLE Menace(
	MenaceId SERIAL,
	Description TEXT,
	SolutionsPossibles TEXT,	
	PRIMARY KEY (MenaceId)
);

CREATE TABLE SubirMenace(
	Plante VARCHAR(20),
	MenaceId SERIAL,
	PRIMARY KEY (MenaceId,Plante),
	FOREIGN KEY (Plante) REFERENCES Plante(NomLatin),
	FOREIGN KEY (MenaceId) REFERENCES Menace(MenaceId)
);





CREATE TABLE Semencier(
	nom VARCHAR(20),
	SiteWeb TEXT, /*checker pour un type url*/
	PRIMARY KEY (nom)
);

CREATE TABLE ProduitSemence(
	Semencier VARCHAR(20),
	VarieteId SERIAL,
	EstBiologique BOOLEAN,
	PRIMARY KEY(Semencier,VarieteId),
	FOREIGN KEY (Semencier) REFERENCES Semencier(nom),
	FOREIGN KEY (VarieteId) REFERENCES Variete(VarieteId)
);

CREATE TABLE MiseEnPlace(
	VarieteId SERIAL,
	JardinId VARCHAR(10),
	XParcelle NUMERIC(6,0),
	YParcelle NUMERIC(6,0),
	NumeroRang SERIAL,
	MiseEnPlace VARCHAR(20),
	PRIMARY KEY (VarieteId,JardinId, XParcelle,YParcelle,NumeroRang),
	FOREIGN KEY (VarieteId) REFERENCES Variete(VarieteId),
	FOREIGN KEY (JardinId,XParcelle, YParcelle, NumeroRang) REFERENCES Rang(JardinId,XParcelle, YParcelle, NumeroRang)
);

/*Revoir pour les ON DELETE et ON UPDATE*/






