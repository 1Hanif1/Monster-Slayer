const randomNumber = (min,max) => Math.floor(Math.random() * (max - min)) + min;
const app = Vue.createApp({
    data: function(){
        return {
            monsterHealth: 100,
            playerHealth: 100,
            round: 0,
            winner: null,
            logs:[]
        }
    },
    watch:{
        round(){
            this.gameStatus()
        }
    },
    computed: {
        playerHealthChange(){
            return {width: this.playerHealth <= 0 ? '0%' : this.playerHealth + "%"};
        },
        monsterHealthChange(){
            return {width: this.monsterHealth <= 0 ? '0%' : this.monsterHealth + "%"};
        },
        enableSpecialAttack(){
            return this.round % 3 !== 0;
        }
    },
    methods: {
        addLog(who, what, howmuch){
            const log = {
                by: who,
                action: what,
                value: howmuch,
            }
            this.logs.unshift(log)
        },
        surrender(){
            this.winner = 'monster';
            this.addLog('player ', 'surrendered', '')
        },
        gameStatus(){
            if(this.playerHealth <= 0 && this.monsterHealth <= 0) this.winner = 'draw';
            else if(this.playerHealth <= 0) this.winner = 'monster';
            else if(this.monsterHealth <= 0) this.winner = 'player';
            else this.winner = null;
        },
        attackMonster(){
            this.round++;
            const attackValue = randomNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.addLog('player ','attacks for', `${attackValue} points`);
            this.attackPlayer();
        },
        attackPlayer(){
            this.round++;
            const attackValue = randomNumber(8, 15);
            this.playerHealth -= attackValue;
            this.addLog('monster ', 'attacks for', `${attackValue} points`)
        },
        specialAttack(){
            this.round++;
            const attackValue = randomNumber(13, 18);
            this.monsterHealth -= attackValue;
            this.addLog('player ', 'used special attack for', `${attackValue} points`)
            this.attackPlayer();
        },
        healPlayer(){
            const heal = randomNumber(12, 16);
            this.playerHealth += heal;
            if(this.playerHealth > 100) this.playerHealth = 100;
            this.addLog('player ','heals for',`${heal} points`)
            this.attackPlayer();
        }
    }
});
app.mount("#game")