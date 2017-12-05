--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: fav; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE fav (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    favtype character varying(10),
    imageurl text NOT NULL,
    favname text NOT NULL,
    note text NOT NULL
);


ALTER TABLE fav OWNER TO postgres;

--
-- Name: fav_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE fav_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fav_id_seq OWNER TO postgres;

--
-- Name: fav_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE fav_id_seq OWNED BY fav.id;


--
-- Name: favtype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE favtype (
    type character varying(10) NOT NULL
);


ALTER TABLE favtype OWNER TO postgres;

--
-- Name: fav id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY fav ALTER COLUMN id SET DEFAULT nextval('fav_id_seq'::regclass);


--
-- Data for Name: fav; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY fav (id, username, favtype, imageurl, favname, note) FROM stdin;
1	Marcus	movie	www.canmag.com/images/front/movies2007/ratatouilleposter5.jpg	Ratatouille	The Lord of the Rings trilogy is my favorite, but I can watch Ratatouille forever, and it will never bore me! Plus, it is not 9 hours long!
2	Robert	movie	https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4NTk4MTk1OF5BMl5BanBnXkFtZTcwNTE2MDIwNA@@._V1_SX300.jpg	TRON: Legacy	Great show!
3	Robert	movie	https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4NTk4MTk1OF5BMl5BanBnXkFtZTcwNTE2MDIwNA@@._V1_SX300.jpg	TRON: Legacy	Great show!
4	Marcus	movie	https://images-na.ssl-images-amazon.com/images/M/MV5BMTIxNDUxNzcyMl5BMl5BanBnXkFtZTcwNTgwOTI3MQ@@._V1_SX300.jpg	Indiana Jones and the Kingdom of the Crystal Skull	Literaly the greatest mistake of our time.
5	Marcus	game	N/A	Shin Megami Tensei: Persona 3 FES	This is my favorite game!
6	Marcus	movie	https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg	Ratatouille	Best ever!
\.


--
-- Name: fav_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('fav_id_seq', 6, true);


--
-- Data for Name: favtype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY favtype (type) FROM stdin;
movie
song
game
\.


--
-- Name: fav fav_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY fav
    ADD CONSTRAINT fav_pkey PRIMARY KEY (id);


--
-- Name: favtype favtype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY favtype
    ADD CONSTRAINT favtype_pkey PRIMARY KEY (type);


--
-- Name: fav fav_favtype_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY fav
    ADD CONSTRAINT fav_favtype_fkey FOREIGN KEY (favtype) REFERENCES favtype(type);


--
-- PostgreSQL database dump complete
--

