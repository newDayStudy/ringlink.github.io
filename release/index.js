
(function (global, factory) {
	if(typeof module === 'object' && typeof module.exports === 'object'){
		module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
	} else {
        factory(global)
	}
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
	function ringlink(opts) {
		var {dom,w,h,v} = opts
        var obj = {
            can: document.getElementById(dom),
            ctx: document.getElementById(dom).getContext('2d'),
            percent: 0,
            dpr: window.devicePixelRatio,
            timer: null,
            init:function(){
                this.can.style.width = w + 'px';
                this.can.style.height = h + 'px';
                this.can.width = w * this.dpr;
                this.can.height = h * this.dpr;
                this.outerCircle();
                this.insetCircle();
                var self = this
                setInterval(function(){
                    self.percent = self.percent + v
                    self.paint()
                })
            },
            outerCircle () {
                this.ctx.fillStyle = '#e4e4e4'
                this.ctx.arc(w* this.dpr/2,h* this.dpr/2,(w* this.dpr/2).toFixed(2),0,Math.PI*2,false)
                this.ctx.fill()
            },
            insetCircle () {
                this.ctx.save()
                this.ctx.beginPath()
                this.ctx.fillStyle = '#fff'
                this.ctx.arc(w* this.dpr/2,h* this.dpr/2,(w/2-21)* this.dpr,0,Math.PI*2,false)
                this.ctx.fill()
                this.ctx.restore()
            },
            paint () {
                if (parseInt(this.percent) <= 100) {
                    this.ctx.beginPath()
                    var g = this.ctx.createLinearGradient(0,0,h,0)
                    g.addColorStop(0, '#4baf1f')
                    g.addColorStop(1, '#8be562')
                    this.ctx.strokeStyle = g
                    this.ctx.lineWidth = 19 * this.dpr
                    this.ctx.lineCap = "round"
                    this.ctx.arc(w*this.dpr/2, h*this.dpr/2, (w/2 - 10)*this.dpr, Math.PI * 1.5, Math.PI * (1.5 + 2 * this.percent / 100 ))
                    this.ctx.stroke()
                }
            }
        }
        obj.init()
    }
    if ( !noGlobal ) {
        window.ringlink = window.$ringlink = ringlink;
    }
    return ringlink;
})

