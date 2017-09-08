(function(window, $, undefined) {
  $(function() {
    fnInitCardClip();
  });

  function fnInitCardClip() {
    var $wrapper = $('.layout-wrapper'),
      openCards = [];

    $wrapper.on('click', '.card-wrapper', function(e) {
      var $this = $(this),
        isFliped = $this.attr('data-flip') === 'true';

      // 如果卡片已经翻开或者 transition 没有结束，不做任何处理
      if (isFliped) {
        return false;
      }

      $this.attr('data-flip', 'true').attr('data-flipback', 'false').addClass('fliped');
    }).on('webkitTransitionEnd transitionend', '.card-wrapper', function(e) {
      var $this = $(this),
        isFlipback = $this.attr('data-flipback') === 'true',
        cards = [];

      // 检测是翻开操作还是翻回操作，翻回操作不做任何处理
      if (isFlipback) {
        return false;
      }

      // 将打开的卡片添加到数组中
      openCards.push($this);

      // 如果打开的卡片数量为基数，不做任何处理
      if (openCards.length === 2) {
        cards = cards.concat(openCards);
        openCards = [];
      } else {
        return false;
      }

      // 检查打开的两张卡片是否是一对组合
      var iTarget = $(cards[0]).attr('data-target');
      var iOriginal = $(cards[1]).attr('data-original');

      if (iTarget !== iOriginal) {
        $.each(cards, function(idx, card) {
          $(card).attr('data-flip', 'false').attr('data-flipback', 'true').removeClass('fliped');
        });
      } else {
        $.each(cards, function(idx, card) {
          $(card).attr('data-complete', 'true');
        });
      }
    });
  }
})(window, jQuery);
