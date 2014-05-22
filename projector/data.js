var battlescape = window.battlescape || {};

(function(external){

var data = {
    settings: {
        path: {
            images: {
                characters: 'images/characters/',
            },
        },
        ui: {
            health_low_threshold: 0.25,
        }
    },
    characters: {
        'player1': {
            name: 'Axe Specalist',
            health: 100,
            min_damage: 15,
            max_damage: 35,
            heal: 10,
            specials: [],
            images: {
                'stand': 'char1.png',
                'attack': '',
                'defend': '',
                'charge': '',
                'hit': '',
                'hurt': '',
                'win': '',
                'dead': '',
                'at_ease': '',
            },
        },
        'player2': {
            name: 'Techno Mage',
            health: 80,
            min_damage: 6,
            max_damage: 30,
            heal: 30,
            images: {
                'stand': 'char3.png',
            },
        },
        'player3': {
            name: 'Monk',
            health: 120,
            min_damage: 10,
            max_damage: 22,
            heal: 50,
            specials: [],
            images: {
                'stand': 'char2.png',
            },
        },
        'player4': {
            name: 'Batton Gorilla',
            health: 140,
            min_damage: 20,
            max_damage: 20,
            heal: 5,
            specials: [],
            images: {
                'stand': 'char4.png',
            },
        },
        'boss': {
            name: 'Nyan Cat',
            health: 500,
            max_damamage: 50,
            min_damage: 30,
            specials: ['all'],
            images: {
                'stand': 'nyan_cat.gif',
            },
        }
    },
    players: ['player1', 'player2', 'player3', 'player4'],
    enemys: ['boss'],
    turn_order: ['player1', 'player2', 'boss' ,'player3', 'player4', 'boss'],
}


// Init ------------------------------------------------------------------------


// External --------------------------------------------------------------------
external.data = data;

}(battlescape));