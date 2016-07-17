load( "classpath:lodash.js" );
var hjson = Java.type( "org.hjson.JsonValue" );

var hjsonString = hjson.readHjson( min.body ).toString();
var stencilset = JSON.parse( hjsonString );
var stencilList = stencilset.stencils;
var propertyPackages = stencilset.propertyPackages;



var adocArray = [];

var groups = _.groupBy( stencilList, "groups" );
var groupKeys = Object.keys( groups );
_.forEach( groupKeys, handleGroup );

min.body = _.join(adocArray,"\n");

function handleGroup( groupKey ) {
  print( "Group:", groupKey );
	adoc( "\n" );
	adoc( "=== "+ groupKey + " ===");
	adoc( "\n" );
  var group = groups[ groupKey ];
  group.forEach( handleStencil );
}

function handleStencil( stencil ) {
  print( "\tId:", stencil.id );
	adoc( "\n" );
	adoc( "==== "+ stencil.id + " ====");
	adoc( "\n" );
  var propertyList = [];
  propertyList = stencil.properties;
  if ( stencil.propertyPackages ) {
    stencil.propertyPackages.forEach( function( propertyPackage ) {
      var package = _.find( propertyPackages, function( p ) {
        return p.name == propertyPackage;
      } );
      propertyList = _.concat( propertyList, package.properties );
    } )
  }
  _.forEach( propertyList, handleProperty );
}

function handleProperty( property ) {
  print( "\t\tProp:", property.title + " : " + property.type + " -> " + property.description);
	adoc( "* " + property.title);
}


function adoc( str){
	adocArray.push(str);
}
