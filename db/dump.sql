--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-07-25 11:03:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12387)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2154 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 190 (class 1259 OID 16419)
-- Name: company_phone; Type: TABLE; Schema: public; Owner: momentosite
--

CREATE TABLE company_phone (
    id integer NOT NULL,
    phone character varying(20) NOT NULL
);


ALTER TABLE company_phone OWNER TO momentosite;

--
-- TOC entry 189 (class 1259 OID 16417)
-- Name: company_phone_id_seq; Type: SEQUENCE; Schema: public; Owner: momentosite
--

CREATE SEQUENCE company_phone_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE company_phone_id_seq OWNER TO momentosite;

--
-- TOC entry 2155 (class 0 OID 0)
-- Dependencies: 189
-- Name: company_phone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: momentosite
--

ALTER SEQUENCE company_phone_id_seq OWNED BY company_phone.id;


--
-- TOC entry 186 (class 1259 OID 16398)
-- Name: office; Type: TABLE; Schema: public; Owner: momentosite
--

CREATE TABLE office (
    id integer NOT NULL,
    office_name character varying(200) NOT NULL,
    address character varying(400) NOT NULL,
    region_id integer NOT NULL,
    weekdays character varying(15) NOT NULL,
    saturday character varying(15) NOT NULL,
    sunday character varying(15) NOT NULL,
    let character varying(20) NOT NULL,
    lng character varying(20) NOT NULL,
    photo character varying(100) NOT NULL,
    dinner character varying(40) NOT NULL,
    city character varying(100) NOT NULL
);


ALTER TABLE office OWNER TO momentosite;

--
-- TOC entry 185 (class 1259 OID 16396)
-- Name: office_id_seq; Type: SEQUENCE; Schema: public; Owner: momentosite
--

CREATE SEQUENCE office_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE office_id_seq OWNER TO momentosite;

--
-- TOC entry 2156 (class 0 OID 0)
-- Dependencies: 185
-- Name: office_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: momentosite
--

ALTER SEQUENCE office_id_seq OWNED BY office.id;


--
-- TOC entry 188 (class 1259 OID 16411)
-- Name: region; Type: TABLE; Schema: public; Owner: momentosite
--

CREATE TABLE region (
    id integer NOT NULL,
    region_name character varying(100) NOT NULL
);


ALTER TABLE region OWNER TO momentosite;

--
-- TOC entry 187 (class 1259 OID 16409)
-- Name: region_id_seq; Type: SEQUENCE; Schema: public; Owner: momentosite
--

CREATE SEQUENCE region_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE region_id_seq OWNER TO momentosite;

--
-- TOC entry 2157 (class 0 OID 0)
-- Dependencies: 187
-- Name: region_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: momentosite
--

ALTER SEQUENCE region_id_seq OWNED BY region.id;


--
-- TOC entry 2016 (class 2604 OID 16422)
-- Name: company_phone id; Type: DEFAULT; Schema: public; Owner: momentosite
--

ALTER TABLE ONLY company_phone ALTER COLUMN id SET DEFAULT nextval('company_phone_id_seq'::regclass);


--
-- TOC entry 2014 (class 2604 OID 16401)
-- Name: office id; Type: DEFAULT; Schema: public; Owner: momentosite
--

ALTER TABLE ONLY office ALTER COLUMN id SET DEFAULT nextval('office_id_seq'::regclass);


--
-- TOC entry 2015 (class 2604 OID 16414)
-- Name: region id; Type: DEFAULT; Schema: public; Owner: momentosite
--

ALTER TABLE ONLY region ALTER COLUMN id SET DEFAULT nextval('region_id_seq'::regclass);


--
-- TOC entry 2147 (class 0 OID 16419)
-- Dependencies: 190
-- Data for Name: company_phone; Type: TABLE DATA; Schema: public; Owner: momentosite
--

COPY company_phone (id, phone) FROM stdin;
1	8 (800) 3333-608
\.


--
-- TOC entry 2158 (class 0 OID 0)
-- Dependencies: 189
-- Name: company_phone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: momentosite
--

SELECT pg_catalog.setval('company_phone_id_seq', 1, true);


--
-- TOC entry 2143 (class 0 OID 16398)
-- Dependencies: 186
-- Data for Name: office; Type: TABLE DATA; Schema: public; Owner: momentosite
--

COPY office (id, office_name, address, region_id, weekdays, saturday, sunday, let, lng, photo, dinner, city) FROM stdin;
1	ул. Яблочкова, 38	ул. Яблочкова, 38	1	8:00 - 20:00	8:00 - 20:00	8:00 - 20:00	46.364524	48.067635	office_photo/OO_Astr_Yablochkova.jpg	13:00 - 14:00	Астрахань
2	ул. Кирова, 14/ ул. Ахматовская, 7	ул. Кирова, 14	1	8:00 - 20:00	8:00 - 20:00	8:00 - 20:00	46.351060	48.036915	office_photo/OO_Astr_CentrOf.jpg	13:00 - 14:00	Астрахань
\.


--
-- TOC entry 2159 (class 0 OID 0)
-- Dependencies: 185
-- Name: office_id_seq; Type: SEQUENCE SET; Schema: public; Owner: momentosite
--

SELECT pg_catalog.setval('office_id_seq', 2, true);


--
-- TOC entry 2145 (class 0 OID 16411)
-- Dependencies: 188
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: momentosite
--

COPY region (id, region_name) FROM stdin;
2	Волгоградская область
1	Астраханская область
3	Воронежская область
\.


--
-- TOC entry 2160 (class 0 OID 0)
-- Dependencies: 187
-- Name: region_id_seq; Type: SEQUENCE SET; Schema: public; Owner: momentosite
--

SELECT pg_catalog.setval('region_id_seq', 3, true);


--
-- TOC entry 2024 (class 2606 OID 16424)
-- Name: company_phone company_phone_pkey; Type: CONSTRAINT; Schema: public; Owner: momentosite
--

ALTER TABLE ONLY company_phone
    ADD CONSTRAINT company_phone_pkey PRIMARY KEY (id);


--
-- TOC entry 2018 (class 2606 OID 16403)
-- Name: office office_pkey; Type: CONSTRAINT; Schema: public; Owner: momentosite
--

ALTER TABLE ONLY office
    ADD CONSTRAINT office_pkey PRIMARY KEY (id);


--
-- TOC entry 2022 (class 2606 OID 16416)
-- Name: region region_pkey; Type: CONSTRAINT; Schema: public; Owner: momentosite
--

ALTER TABLE ONLY region
    ADD CONSTRAINT region_pkey PRIMARY KEY (id);


--
-- TOC entry 2020 (class 2606 OID 16405)
-- Name: office uniq; Type: CONSTRAINT; Schema: public; Owner: momentosite
--

ALTER TABLE ONLY office
    ADD CONSTRAINT uniq UNIQUE (office_name);


-- Completed on 2017-07-25 11:03:40

--
-- PostgreSQL database dump complete
--

