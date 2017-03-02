$.getJSON("data.json", function(db) {

  // Database Parser
  var evolutions = _.keys(db);

  console.log(db);

  // Vue

  var example1 = new Vue({
    el: '#app',
    data: {
      items: db,
      evolutions: Object.keys(db),
      pickedEvolution: 'In-Training I',
      search: '',
      selected: null,
      show: false
    },
    computed: {
      searchResult: function () {

        var items = db[this.pickedEvolution]

        return items.filter(function (item) {
          return item.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
        }.bind(this))

      },
      modalTitle: function(){
        if(this.selected){
          return this.selected.name + ' -> ' + this.selected.evolution
        }
      }
    },
    watch: {
      search: function(){
        console.log('change')
      }
    },
    methods: {
      showInfo: function(selected){

        console.log(selected)

        this.selected = selected;

        $('#modal').modal()

      }
    }
  })



});
