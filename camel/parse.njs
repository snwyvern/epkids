load( "classpath:lodash.js" );
var hjson = Java.type( "org.hjson.JsonValue" );

var hjsonString = hjson.readHjson( min.body ).toString();
var stencilset = JSON.parse( hjsonString );
var stencilList = stencilset.stencils;
var propertyPackages = stencilset.propertyPackages;



var adocArray = [];
adoc( "\n" );
adoc( ":toc: macro" );
adoc( ":toclevels: 4" );
adoc( ":toc-title: Inhaltsverzeichnis" );

var groups = _.groupBy( stencilList, "groups" );
var groupKeys = Object.keys( groups );
_.forEach( groupKeys, handleGroup );

min.body = _.join( adocArray, "\n" );


function handleGroup( groupKey, index ) {
  adoc( "\n" );
  if ( index == 0 ) {
    adoc( "toc::[]" );
  } else {
    adoc( "== " + groupKey + " ==" );
    var group = groups[ groupKey ];
    group.forEach( handleStencil );
  }
}

function handleStencil( stencil ) {
  adoc( "\n" );
  adoc( "=== " + stencil.id + " ===" );
  adoc( "\n" );

  adoc( "image:/repo/global/" + stencil.icon + "[]" );
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
  adoc( "[caption=]" );
  adoc( '.Properties' );
  adoc( '[cols="1,1,4", frame=none,grid=rows,options="header"]' );
  adoc( '|===' )
  adoc( '|Name|Type|Description' );
  _.forEach( propertyList, handleProperty );
  adoc( '|===' )
}

function handleProperty( property ) {
  if ( property == null || property.title==null ) return;
  print( "\t\tProp:", property.title + " : " + property.type + " -> " + property.description );
  adoc( '|*' + property.title + "*" )
  adoc( '|' + property.type )
  var desc = property.description;
  if ( _.isEmpty( desc ) ) {
    desc = '';
  }
  if ( desc.startsWith( "#adoc#" ) ) {
    adoc( '|\n' + desc.substring( 6 ) );
  } else {
    adoc( '|+++' + desc + '+++' );
  }
}


function adoc( str ) {
  adocArray.push( str );
}
