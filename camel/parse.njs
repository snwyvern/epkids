load( "classpath:lodash.js" );
var hjson = Java.type( "org.hjson.JsonValue" );

var hjsonString = hjson.readHjson( min.body ).toString();
var stencilset = JSON.parse( hjsonString );
var stencilList = stencilset.stencils;
var propertyPackages = stencilset.propertyPackages;


min.body = "OK"; //stencilList;


var groups = _.groupBy( stencilList, "groups" );
var groupKeys = Object.keys(groups);
_.forEach( groupKeys, handleGroup );


function handleGroup( groupKey ) {
  print( "Group:", groupKey );
	var group = groups[groupKey];
	group.forEach( handleStencil );
}

function handleStencil( stencil ) {
  print( "\tId:", stencil.id );
	var propertyList = [];
	propertyList = stencil.properties;
  if ( stencil.propertyPackages ) {
		stencil.propertyPackages.forEach(function( propertyPackage ){
			var package = _.find( propertyPackages, function(p) { return p.name == propertyPackage; } );
			//print("\t\tPackage:",package.name);
			propertyList = _.concat( propertyList, package.properties);
		})
  }
	_.forEach( propertyList, handleProperty );
}
function handleProperty( property ) {
  print( "\t\tProp:", property.title+" : "+ property.type );
}
