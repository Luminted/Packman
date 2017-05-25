import $ from 'jquery';
import PACMAN from './game.js';
import Pacman from './Pacman.js'

//1.
/**  
 * Állapotok számokhoz rendelése
*/


 ////                                             INICIALIZÁLÁS
var el = document.getElementById("pacman");
window.setTimeout(function () { new PACMAN().init(el, "./"); }, 0);