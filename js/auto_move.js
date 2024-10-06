
var auto_move_flag = false;
var auto_move_time = 50;

function start_auto_move(){
	auto_move_flag = true;
	auto_move();
}

function auto_move(){
	if ( auto_move_flag === false )
		return;

	GM.move( 2 );

	//move right if can't move down
	if(!GM.moved){
		GM.move( 1 );
		//move up irf can't move down
		if(!GM.moved){
			GM.move( 0 );
			GM.move( 1 );
			GM.move( 2 );
			GM.move( 1 );
			GM.move( 2 );
			GM.move( 0 );
		if(!GM.moved){
			GM.move( 1 );
			GM.move( 2 );
			GM.move( 0 );
			GM.move( 2 );
			GM.move( 1 );
			GM.move( 0 );
		if(!GM.moved){
			GM.move( 1 );
            GM.move( 2 );
		}
		}
		}
	}
	setTimeout( "auto_move()", auto_move_time );
}

function stop_auto_move(){
	auto_move_flag = false;
}

window.requestAnimationFrame(function(){
	document.getElementById("auto-move-run").addEventListener("click",function(){
		var time = parseInt( document.getElementById("auto-move-input-time").value );
		if ( !isNaN( time ) ){
			auto_move_time = time;
			if ( auto_move_flag === false ){
				start_auto_move();
			}
		}
	});
	document.getElementById("auto-move-stop").addEventListener("click",function(){
		stop_auto_move();
	});
});
