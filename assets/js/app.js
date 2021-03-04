const poke_container = document.getElementById('poke_container');
const load_more_btn = document.querySelector('.load_more');
const modal = document.querySelector('.modal_container');
const about_btn = document.querySelector('#about_btn');
const stats_btn = document.querySelector('#stats_btn');
const moves_btn = document.querySelector('#moves_btn');
const about_tab = document.querySelector('.about');
const stats_tab = document.querySelector('.stats');
const moves_tab = document.querySelector('.moves');
const body = document.querySelector('body');
const img_container = document.querySelector('.img_container');
const search_input = document.querySelector(".search_bar input");


const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};