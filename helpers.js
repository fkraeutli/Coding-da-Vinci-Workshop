function arrange( data ) {			
		
	function collide( node ) {
		
		var r = node.r,
			nx1 = node.x - r,
			nx2 = node.x + r,
			ny1 = node.y - r,
			ny2 = node.y + r;
			
		return function( quad, x1, y1, x2, y2 ) {
			
			if ( quad.point && ( quad.point !== node ) ) {
				
				var x = node.x - quad.point.x,
					y = node.y - quad.point.y || 1,
					l = Math.sqrt(x * x + y * y);
					
				r = node.r + quad.point.r + 3;
			
				if ( l < r ) {
			
					l = ( l - r ) / l ;

					node.y -= y *= l;
					quad.point.y += y;	
			
				}
			}
			
			return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
			
		};			
	
	}
	
	var iterations = 25;

	while ( --iterations ) {

		var i = 0,
			n = data.length,
			q = d3.geom.quadtree()
				.x( function( d ) { return d.x; } )
				.y( function( d ) { return d.y; } )
				( data );

		while ( ++i < n ) q.visit( collide( data[ i ] ) ) ;

	}
		
}