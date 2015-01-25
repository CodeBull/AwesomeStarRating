(function() {
    
    "use strict";
    
    (function($) {
        var toggleStarEl;
        toggleStarEl = function($star, state) {
            if (state) {
                return $star.removeClass('fa-star-o').addClass('fa-star');
            } else {
                return $star.removeClass('fa-star').addClass('fa-star-o');
            }
        };
        return $.fn.awesomeRating = function(options) {
            var $inputScore, $ratingContainer, $star, i, inputName, onChangeCallback, ratingScore, stars, _i, _results;
            
            var settings = $.extend({
                stars	: 5,
                color	: '#1E90FF',
                size	: '15px',
                cursor  : 'pointer',
                disabled: false
            }, options);
            
            $ratingContainer = this;
            $ratingContainer.css({ 'cursor': settings.cursor, 'color': settings.color, 'font-size': settings.size });
            inputName = settings.name || $ratingContainer.attr('data-name') || 'rating';
            ratingScore = parseInt(settings.score || $ratingContainer.attr('data-score') || 0);
            onChangeCallback = settings.onChange;
            $inputScore = $('<input />', {
                type: 'hidden',
                value: ratingScore,
                name: inputName
            });
            
            if(settings.disabled == false) {
                $ratingContainer.append($inputScore);
            }
            
            stars = [];
            _results = [];
            for (i = _i = 1; _i <= 5; i = ++_i) {
                $star = $('<i class="fa"></i>');
                toggleStarEl($star, i <= ratingScore);
                $ratingContainer.append($star);
                stars[i] = $star;
                if(settings.disabled == false) {
                    _results.push($star.on('click', {
                        idx: i
                    }, function(ev) {
                        var idx, s, _j;
                        idx = ev.data.idx;
                        $inputScore.val(idx);
                        for (s = _j = 1; _j <= 5; s = ++_j) {
                            toggleStarEl(stars[s], s <= idx);
                        }
                        if (onChangeCallback) {
                            return onChangeCallback.call($ratingContainer, idx);
                        }
                    }));
                }
            }
            return _results;
        };
    })(jQuery);
    
}).call(this);
