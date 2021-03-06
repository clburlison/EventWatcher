'use strict';

const utils = require('../services/utils.js');

class PokemonEvents {

    /**
     * Returns a list of all events
     */
    static async getAll() {
        const url = "https://raw.githubusercontent.com/ccev/pogoinfo/info/events/all.json";
        const data = await utils.get(url);
        return data;
    }

    /**
     * Returns a list of active events
     */
    static async getActive() {
        const url = "https://raw.githubusercontent.com/ccev/pogoinfo/info/events/active.json";
        const data = await utils.get(url);
        return data;
    }

    /**
     * Returns dictionary of available raid bosses by level
     */
    static async getAvailableRaidBosses() {
        const url = "https://raw.githubusercontent.com/ccev/pogoinfo/info/raid-bosses.json";
        const data = await utils.get(url);
        return data
    }

    /**
     * Returns an array of available nesting Pokemon IDs
     */
    static async getAvailableNestPokemon() {
        const url = "https://raw.githubusercontent.com/ccev/pogoinfo/info/nests.json";
        const data = await utils.get(url);
        return data;
    }

    /**
     * Returns the unix timestamp of the last next migration
     */
    static async getLastNestMigration() {
        const url = "https://raw.githubusercontent.com/ccev/pogoinfo/info/last-nest-migration";
        const data = await utils.get(url);
        return data;
    }

    /**
     * Returns the active invasion grunt types dictionary
     */
    static async getAvailableGrunts() {
        const url = "https://raw.githubusercontent.com/ccev/pogoinfo/info/grunts.json";
        const data = await utils.get(url);
        return data;
    }

    /**
     * Build event object from active events endpoint
     */
    static async buildActiveEvent() {
        const active = await this.getActive();
        const lastNestMigrationTimestamp = await this.getLastNestMigration();
        const obj = {
            name: active.name,
            start: active.start ? new Date(active.start).toLocaleString() : null,
            end: new Date(active.end).toLocaleString(),
            lastNestMigration: new Date(lastNestMigrationTimestamp * 1000).toLocaleString(),
            bonuses: active.details.bonuses.join('\n- '),
            eggs: utils.stripIds(active.details.eggs),
            spawns: utils.stripIds(active.details.spawns),
            raids: Object.keys(active.details.raids)
                         .map(x => `Level ${x}: ` + utils.stripIds(active.details.raids[x]).map(y => locale.getPokemonName(y))
                         .join(', ')),
            nests: await this.getAvailableNestPokemon(),
        };
        return obj;
    }
}

module.exports = PokemonEvents;