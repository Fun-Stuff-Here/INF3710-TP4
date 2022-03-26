/*Queries*/
SET search_path = "Jardin";


/*1) (2 points) Lister toutes les plantes qui sont actuellement dans les rangs d’un jardin*/

SELECT *
FROM Plante
WHERE Plante.NomLatin IN(
	SELECT NomLatin
	FROM PlanteRang
	WHERE JardinId = 'id' /*variable du jardin id icitte*/
);

/*2) (2 points) Lister le nombre de rangs minimum et maximum sur les parcelles d’un jardin donné (choisissez-en dans vos données)*/

SELECT JardinId, XParcelle, YParcelle, MIN(NumeroRang), MAX(NumeroRang)  
FROM JardinAugmente
WHERE JardinAugmente.JardinId = 'id' /*variable du jardin id icitte*/
GROUP BY JardinId, XParcelle, YParcelle; 

/*3) (2 points) Lister les détails des parcelles qui ont la variété de plante A et la variété de plante B*/
SELECT *
FROM Parcelle
WHERE (Parcelle.jardinid, Parcelle.xparcelle, Parcelle.yparcelle) IN(
	(
		SELECT jardinid, xparcelle, yparcelle 
		FROM PlanteRang
		WHERE PlanteRang.VarieteId = 2 /*variable de la varieter A icitte*/ 
	) INTERSECT (
		SELECT jardinid, xparcelle, yparcelle
		FROM PlanteRang
		WHERE PlanteRang.VarieteId = 3 /*variable de la varieter B icitte*/ 
	)
); 

/*4) (2 points) Lister les détails des parcelles qui ont la variété de plante A ou la variété de plante B*/

SELECT *
FROM Parcelle
WHERE (Parcelle.jardinid, Parcelle.xparcelle, Parcelle.yparcelle) IN(
	(
		SELECT jardinid, xparcelle, yparcelle 
		FROM PlanteRang
		WHERE PlanteRang.VarieteId = 2 /*variable de la varieter A icitte*/ 
	) UNION (
		SELECT jardinid, xparcelle, yparcelle
		FROM PlanteRang
		WHERE PlanteRang.VarieteId = 3 /*variable de la varieter B icitte*/ 
	)
); 

/*5) (2 points) Lister les détails des parcelles qui ont la variété de plante A mais pas la variété de plante B*/

SELECT *
FROM Parcelle
WHERE (Parcelle.jardinid, Parcelle.xparcelle, Parcelle.yparcelle) IN(
	(
		SELECT jardinid, xparcelle, yparcelle 
		FROM PlanteRang
		WHERE PlanteRang.VarieteId = 2 /*variable de la varieter A icitte*/ 
	) EXCEPT (
		SELECT jardinid, xparcelle, yparcelle
		FROM PlanteRang
		WHERE PlanteRang.VarieteId = 3 /*variable de la varieter B icitte*/ 
	)
); 

/*6) (2 points) Lister tous les rangs d’un jardin donné avec leurs variétés de plantes s’ils sont cultivés. Dans le cas contraire, affichez null. */
SELECT *
FROM VueRang LEFT OUTER JOIN (
	SELECT JardinId, XParcelle, YParcelle, NumeroRang, VarieteId 
	FROM PlanteRang
	GROUP BY JardinId, XParcelle, YParcelle, NumeroRang, VarieteId
) as ab USING(JardinId, XParcelle, YParcelle, NumeroRang);

/*7) (2 points) Quel est le nombre de jardins uniquement avec des semences biologiques ?*/
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

/*8) (2 points) Lister tous les jardins qui ont au moins un rang en jachère*/
SELECT *
FROM Jardin
WHERE Jardin.jardinid IN(
	SELECT Jardinid
	FROM VueRangJachere
);

/*9) (2 points) Quelles sont les menaces auxquelles sont sensibles les plantes fougères ?*/
SELECT *
FROM Menace
WHERE Menace.MenaceId IN (
	SELECT MenaceId
	FROM PlanteMenace
	WHERE Categorie = 'fougères'
);


/*10) (2 points) Quelles sont les plantes de la variété tuberosum ?*/
SELECT *
FROM Plante
WHERE Plante.nomlatin IN(
	SELECT NomLatin
	FROM PlanteVariete
	WHERE Nomvariete = 'tuberosum'
);


