const db = require('../db');
const config = require('../db/config');

db.query(`
CREATE TABLE public.users
(
    id       serial,
    name     character varying(30),
    password character varying(60),
    email    character varying(30) unique,
    CONSTRAINT users_pkey PRIMARY KEY (id)
) 
    WITH (OIDS = FALSE) TABLESPACE pg_default;
    ALTER TABLE public.users OWNER to ${config.user};

CREATE TABLE public.followers
(
    id serial,
    follower integer,
    following integer,
    CONSTRAINT pk_followers PRIMARY KEY (id),
    CONSTRAINT fk_followers FOREIGN KEY (follower)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
) 
    WITH (OIDS = FALSE) TABLESPACE pg_default;
    ALTER TABLE public.followers OWNER to ${config.user};
    
CREATE TABLE public.posts
(
    id serial,
    title character varying(150),
    text text,
    author_id integer,
    date timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT posts_pkey PRIMARY KEY (id)
)
    WITH (OIDS = FALSE) TABLESPACE pg_default;
    ALTER TABLE public.posts OWNER to ${config.user};`
);
