var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema (
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

function calc_span(birth, death) {


}

AuthorSchema
.virtual('name')
.get(function() {
  return this.family_name + ', ' + this.first_name;
});

AuthorSchema
.virtual('lifespan')
.get(function(){
  if (this.date_of_birth && this.date_of_death) {
    return moment(this.date_of_birth).format('MMMM Do, YYYY') + " - " + moment(this.date_of_death).format('MMMM Do, YYYY');
  }
  if (this.date_of_birth) {
    return moment(this.date_of_birth).format('MMMM Do, YYYY') + " -";
  }
  return '';
});

AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('date_of_death_yyyy_mm_dd')
.get(function () {
  return moment(this.date_of_death).format('YYYY-MM-DD');
});

AuthorSchema
.virtual('date_of_birth_yyyy_mm_dd')
.get(function () {
  return moment(this.date_of_birth).format('YYYY-MM-DD');
});

module.exports = mongoose.model('Author', AuthorSchema);
