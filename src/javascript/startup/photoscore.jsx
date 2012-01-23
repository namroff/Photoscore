var photoscore = {
        
    // ## runScript
    // Runs a specified script.
    //
    // - scriptName: the name of the script to run
    runScript: function( scriptName ) {

        // TODO: options
        // - specify path (default: scripts directory)
        // - specify extension (default: *.jsx)

        var scriptsFolder =  decodeURI( app.path + '/ '+ localize( "$$$/ScriptingSupport/InstalledScripts=Presets/Scripts" ) ),
            scriptFile = File( scriptsFolder + "/" + scriptName + ".jsx" );

        $.evalFile( scriptFile );

    },

    // ## stampVisible
    // Creates a new layer that contains an image that is
    // the same as the result of merging all visible layers.
    // If there is only one layer, copies that layer.
    // Inserts the new layer above the active/selected layer
    // and makes the new layer active/selected.
    //
    // Background: 
    // As a user, you would do cmd+opt+shif+e for multiple
    // layers or cmd+j for a single layer. In an action, you
    // can't do conditional logic, so you have to create a
    // blank layer before the stamp visible command just in
    // case there's only one layer. Of course with scripting,
    // you can do all the conditional logic you want.
    stampVisible: function() {

        // TODO: this is really a method on ArtLayers. should try to find
        // the best way of wrapping that and providing it there.

        // TODO: options
        // - only active layer and below?
        
        var doc = app.activeDocument,
            layers = doc.artLayers;

        // TODO: BUG! this should be number of visible layers, not number of layers
        if ( layers.length > 1 ) {

            // I cheated here and used the code recorded by ScriptListener
            // TODO: figure out how to do this without executeAction

            var idMrgV = charIDToTypeID( "MrgV" ),
                desc9 = new ActionDescriptor(),
                idDplc = charIDToTypeID( "Dplc" );

            desc9.putBoolean( idDplc, true );
            executeAction( idMrgV, desc9, DialogModes.NO );

        }
        else {
            layers[ 0 ].duplicate();
            app.activeDocument.activeLayer = layers[0];
        }

    },

    // ## addLayerMask
    // Creates a new layer mask for the active layer
    addLayerMask: function() {

        // TODO: this is really a method on ArtLayer. should try to find
        // the best way of wrapping and adding that functionality.

        // I cheated here and used the code recorded by ScriptListener
        // TODO: figure out how to do this without executeAction

        var idMk = charIDToTypeID( "Mk  " ),
            desc16 = new ActionDescriptor(),
            idNw = charIDToTypeID( "Nw  " ),
            idChnl = charIDToTypeID( "Chnl" ),
            idAt = charIDToTypeID( "At  " ),
            ref13 = new ActionReference(),
            idMsk = charIDToTypeID( "Msk " ),
            idUsng = charIDToTypeID( "Usng" ),
            idUsrM = charIDToTypeID( "UsrM" ),
            idRvlA = charIDToTypeID( "RvlA" );
        desc16.putClass( idNw, idChnl );
        ref13.putEnumerated( idChnl, idChnl, idMsk );
        desc16.putReference( idAt, ref13 );
        desc16.putEnumerated( idUsng, idUsrM, idRvlA );
        executeAction( idMk, desc16, DialogModes.NO );
    },

    // TODO: selection methods for other tools (or find the api)
    selectPaintbrushTool: function() {
        var idslct = charIDToTypeID( "slct" ),
            desc8 = new ActionDescriptor(),
            idnull = charIDToTypeID( "null" ),
            ref4 = new ActionReference(),
            idPbTl = charIDToTypeID( "PbTl" );
        ref4.putClass( idPbTl );
        desc8.putReference( idnull, ref4 );
        executeAction( idslct, desc8, DialogModes.NO );
    },

    newPaintLayer: function( fn ) {
        photoscore.stampVisible();
        var artLayers = app.activeDocument.artLayers;
        fn( artLayers[ 0 ] );
        photoscore.addLayerMask();
        photoscore.selectPaintbrushTool();
    },

    setBlendingThresholds: function( options ) {

        // TODO: figure out how to default all values not supplied in options

        var idsetd = charIDToTypeID( "setd" );
        var desc16 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref10 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        var idT = charIDToTypeID( "T   " );
        var desc17 = new ActionDescriptor();
        var idBlnd = charIDToTypeID( "Blnd" );
        var list7 = new ActionList();
        var desc18 = new ActionDescriptor();
        var idChnl = charIDToTypeID( "Chnl" );
        var ref11 = new ActionReference();
        var idGry = charIDToTypeID( "Gry " );
        var idSrcB = charIDToTypeID( "SrcB" );
        var idSrcl = charIDToTypeID( "Srcl" );
        var idSrcW = charIDToTypeID( "SrcW" );
        var idSrcm = charIDToTypeID( "Srcm" );
        var idDstB = charIDToTypeID( "DstB" );
        var idDstl = charIDToTypeID( "Dstl" );
        var idDstW = charIDToTypeID( "DstW" );
        var idDstt = charIDToTypeID( "Dstt" );
        var idLefx = charIDToTypeID( "Lefx" );
        var desc19 = new ActionDescriptor();
        var idScl = charIDToTypeID( "Scl " );
        var idPrc = charIDToTypeID( "#Prc" );
        ref10.putEnumerated( idLyr, idOrdn, idTrgt );
        desc16.putReference( idnull, ref10 );
        ref11.putEnumerated( idChnl, idChnl, idGry );
        desc18.putReference( idChnl, ref11 );
        desc18.putInteger( idSrcB, options.thisLayerBlackMin || 0 );
        desc18.putInteger( idSrcl, options.thisLayerBlackMax || 0 );
        desc18.putInteger( idSrcW, options.thisLayerWhiteMin || 255 );
        desc18.putInteger( idSrcm, options.thisLayerWhiteMax || 255 );
        desc18.putInteger( idDstB, options.underlyingLayerBlackMin || 0 );
        desc18.putInteger( idDstl, options.underlyingLayerBlackMax || 0 );
        desc18.putInteger( idDstW, options.underlyingLayerWhiteMin || 255 );
        desc18.putInteger( idDstt, options.underlyingLayerWhiteMax || 255 );
        list7.putObject( idBlnd, desc18 );
        desc17.putList( idBlnd, list7 );
        desc19.putUnitDouble( idScl, idPrc, 333.333333 );  // TODO: what's this value?
        desc17.putObject( idLefx, idLefx, desc19 );
        desc16.putObject( idT, idLyr, desc17 );
        executeAction( idsetd, desc16, DialogModes.NO );
    },
    
    // TODO: find a scheme for wrapping enumeration types and adding more
    //       useful functionality like iteration, introspection, etc.
    // TODO: scripts for each blend mode...
    paintMultiply: function() {
        photoscore.newPaintLayer(function( layer ) {
            layer.blendMode = BlendMode.MULTIPLY;
        });
    },



    paintMidtoneContrast: function() {
        photoscore.newPaintLayer(function( layer ) {
            layer.applyHighPass( 40 );
            layer.blendMode = BlendMode.OVERLAY;var idsetd = charIDToTypeID( "setd" );
            layer.opacity = 66;
            photoscore.setBlendingThresholds({
                thisLayerBlackMin: 50,
                thisLayerBlackMax: 90,
                thisLayerWhiteMin: 135,
                thisLayerWhiteMax: 210,
                underlyingLayerBlackMin: 50,
                underlyingLayerBlackMax: 90,
                underlyingLayerWhiteMin: 135,
                underlyingLayerWhiteMax: 210
            });
        });
    }

};

if ( !app.namroffmods ) {
  app.namroffmods = {};
}
app.namroffmods.photoscore = photoscore;