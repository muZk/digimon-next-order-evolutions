$.getJSON("data.json", function(db) {

  $.getJSON('field.json', function(field){

    // Database Parser

    var evolutions = _.keys(db);
    var list = [];

    _.each(evolutions, function(evolution){
      _.each(db[evolution], function(digimon){
        digimon['image_url'] = 'images/' + digimon.name + '.jpg';
        digimon['evolution_image'] = 'images/' + digimon.evolution + '.jpg';
        digimon['tier'] = evolution;
        list.push(digimon);  
      })
    })

    // Vue

    var example1 = new Vue({
      el: '#app',
      data: {
        evolutions: Object.keys(db),
        pickedEvolution: 'In-Training I',
        search: '',
        list: field,
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
            return this.selected.name + ' -> ' + this.evolution.evolution + ' Requeriments';
          }
        },
        selectedEvolutions: function(){

          if(this.selected){

            return list.filter(function(digimon){
              return digimon.name.toLowerCase() == this.selected.name.toLowerCase()
            }.bind(this))

          } else {
            return [];
          }

        },

        evolutionAttrs: function(){

          if(this.evolution){
            return _.omit(this.evolution, ['image_url', 'tier', 'evolution_image', 'name', 'evolution'])
          }

        },

        evolutionImage: function(){
          if(this.evolution){
            return this.evolution.evolution_image
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
