$.getJSON("requeriments_final.json", function(db) {

  $.getJSON('evolutions_final.json', function(field){

    // Database Parser
    var fieldList = [];

    _.each(field, function(digimon){
      digimon.image = 'images/' + digimon.name + '.jpg';
      if(digimon.stage != 'M')
        fieldList.push(digimon);
    });

    // Vue

    var example1 = new Vue({
      el: '#app',
      data: {
        evolutions: Object.keys(db),
        search: '',
        list: fieldList,
        selected: null, // Used to check evolutions
        show: false,
        evolution: null // Used for modal
      },
      computed: {
        searchResult: function () {
          return this.list.filter(function (digimon) {
            return digimon.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
          }.bind(this))
        },
        modalTitle: function(){
          if(this.selected && this.evolution){
            return this.selected.name + ' -> ' + this.evolution.name + ' Requeriments';
          }
        },
        selectedEvolutions: function(){

          if(this.selected){

            return _.compact(_.map(this.selected.evolutions, function(evolutionName){
              return field[evolutionName];
            }));

          } else {
            return [];
          }

        },

        evolutionAttrs: function(){

          if(this.evolution){
            return _.omit(_.find(db, { Evolution: this.evolution.name }), 'Evolution')
          }

        },

        evolutionImage: function(){
          if(this.evolution){
            return this.evolution.image
          }
        }

      },
      methods: {
        showInfo: function(evolution){

          this.evolution = evolution;

          $('#modal').modal()

        },

        select: function(selected){
          this.selected = selected;
        }
      }
    })

  })

});
