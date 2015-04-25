//이미지 슬라이더 플러그인 제작
    // $.fn.red = function() {
    //  this.css('color', 'red')
    // }; //여기서의 this는 제이쿼리로 감싼 'p'... = $('p')
    // $('p').red();
(function($){
    var defaults = {
        period : 400
    };

    $.fn.carousel = function(options) {
        var opt = $.extend({}, defaults, options);
        var self = this;

        self.find('li').appendTo(self.find('ul'));

        self
        .data('currentIndex', 0)//임의의 값을 저장할 수 있다.
        .on('move', function(event, step){
            //애니메이션이 되고 있으면 사용자 입력을 무시한다
            if ($(this).find('li:first').is(':animated')){
                return;
            }

            var currentIndex = $(this).data('currentIndex');
            currentIndex = currentIndex+step;

            var maxIndex = $(this).find('li').length-1;

            if (step<0 && currentIndex < 0) {
                currentIndex = maxIndex;
            } else if (step>0 && currentIndex > maxIndex) {
                currentIndex = 0;
            }

            self
                .data('currentIndex', currentIndex)
                .find('li:first').animate({
                    'margin-left': -currentIndex*$(this).width()
            });
        })
        .on('click', '.prev', function(event){
            event.preventDefault();
            self.trigger('move',[-1]);
        })
        .on('click', '.next',function(event){
            event.preventDefault();
            self.trigger('move',[1]);
        });
    }
})