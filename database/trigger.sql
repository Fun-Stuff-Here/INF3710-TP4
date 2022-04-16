SET search_path = "Jardin";

CREATE TABLE IF NOT EXISTS varieteaudit(
	id serial not null,
	nomlatin VARCHAR(30),
	jardinid VARCHAR(10),
	xparcelle NUMERIC(6,0),
	yparcelle NUMERIC(6,0),
	numerorang SERIAL,
	entrydate timestamp,
	PRIMARY KEY (id)
);

CREATE OR REPLACE FUNCTION variete_audit_log() RETURNS TRIGGER AS $miseenplace$
	BEGIN
		insert into varieteaudit (nomlatin, jardinid, xparcelle, yparcelle, numerorang, entrydate) values (new.nomlatin, new.jardinid, new.xparcelle, new.yparcelle, new.numerorang, current_timestamp);
		return NEW;
	END;
$miseenplace$ LANGUAGE plpgsql;

CREATE TRIGGER variete_audit_trigger AFTER INSERT ON miseenplace
FOR EACH ROW EXECUTE PROCEDURE variete_audit_log();