(function($) {
    Galleria.addTheme({
        name : "folio",
        author : "Galleria",
        css : "galleria.folio.css",
        defaults : {
            transition : "pulse",
            thumbCrop : "width",
            imageCrop : false,
            carousel : false,
            show : false,
            easing : "galleriaOut",
            fullscreenDoubleTap : false,
            trueFullscreen : false,
            _webkitCursor : false,
            _animate : true
        },
        /**
         * @param {Object} options
         * @return {undefined}
         */
        init : function(options) {
            Galleria.requires(1.28, "This version of Folio theme requires Galleria version 1.2.8 or later");
            this.addElement("preloader", "loaded", "close").append({
                container : "preloader",
                preloader : "loaded",
                stage : "close"
            });
            var self = this;
            var pointer = this.$("stage");
            var el = this.$("thumbnails");
            var items = this.$("images");
            var element = this.$("info");
            var loader = this.$("loader");
            var $target = this.$("target");
            /** @type {number} */
            var getDataLength = 0;
            var error = $target.width();
            /** @type {number} */
            var _width = 0;
            var async = options.show;
            /** @type {string} */
            var cDigit = window.location.hash.substr(2);
            /**
             * @param {number} event
             * @return {undefined}
             */
            var resize = function(event) {
                self.$("info").css({
                    left : Math.max(20, $(window).width() / 2 - event / 2 + 10),
                    marginBottom : self.getData().video ? 40 : 0
                });
            };
            /**
             * @param {Array} args
             * @return {?}
             */
            var fn = function(args) {
                return Math.min.apply(window, args);
            };
            /**
             * @param {Array} a
             * @return {?}
             */
            var max = function(a) {
                return Math.max.apply(window, a);
            };
            /**
             * @param {Object} el
             * @param {Object} options
             * @return {undefined}
             */
            var init = function(el, options) {
                options = $.extend({
                    speed : 400,
                    width : 190,
                    /**
                     * @return {undefined}
                     */
                    onbrick : function() {
                    },
                    /**
                     * @return {undefined}
                     */
                    onheight : function() {
                    },
                    delay : 0,
                    debug : false
                }, options);
                el = $(el);
                var sheets = el.children();
                var value = el.width();
                /** @type {number} */
                var k = Math.floor(value / options.width);
                /** @type {Array} */
                var height = [];
                var j;
                var i;
                var pos;
                var length;
                var css = {
                    "float" : "none",
                    position : "absolute",
                    display : Galleria.SAFARI ? "inline-block" : "block"
                };
                if (el.data("colCount") === k) {
                    return;
                }
                el.data("colCount", k);
                if (!sheets.length) {
                    return;
                }
                /** @type {number} */
                j = 0;
                for (;j < k;j++) {
                    /** @type {number} */
                    height[j] = 0;
                }
                el.css("position", "relative");
                sheets.css(css).each(function(delay, element) {
                    element = $(element);
                    /** @type {number} */
                    j = k - 1;
                    for (;j > -1;j--) {
                        if (height[j] === fn(height)) {
                            /** @type {number} */
                            i = j;
                        }
                    }
                    pos = {
                        top : height[i],
                        left : options.width * i
                    };
                    if (typeof pos.top != "number" || typeof pos.left != "number") {
                        return;
                    }
                    if (options.speed) {
                        window.setTimeout(function(allow, options, pattern) {
                            return function(dataAndEvents) {
                                Galleria.utils.animate(allow, pattern, {
                                    easing : "galleriaOut",
                                    duration : options.speed,
                                    complete : options.onbrick
                                });
                            };
                        }(element, options, pos), delay * options.delay);
                    } else {
                        element.css(pos);
                        options.onbrick.call(element);
                    }
                    if (!element.data("height")) {
                        element.data("height", element.outerHeight(true));
                    }
                    height[i] += element.data("height");
                });
                length = max(height);
                if (length < 0) {
                    return;
                }
                if (typeof length != "number") {
                    return;
                }
                if (options.speed) {
                    el.animate({
                        height : max(height)
                    }, options.speed, options.onheight);
                } else {
                    el.height(max(height));
                    options.onheight.call(el);
                }
            };
            this.bind("fullscreen_enter", function(dataAndEvents) {
                this.$("container").css("height", "100%");
            });
            this.bind("fullscreen_exit", function(dataAndEvents) {
                if (this.getData().iframe) {
                    $(this._controls.getActive().container).find("iframe").remove();
                    this.$("container").removeClass("iframe");
                }
                element.hide();
                $(self._controls.getActive().container).hide();
                el.css("left", 0);
                pointer.css("left", -1E4);
            });
            this.bind("loadstart", function(evt) {
                if (Galleria.TOUCH) {
                    this.$("image-nav").toggle(!!evt.galleriaData.iframe);
                }
            });
            this.bind("thumbnail", function(e) {
                this.addElement("plus");
                var next = e.thumbTarget;
                var o = this.$("plus").css({
                    display : "block"
                }).insertAfter(next);
                var self = $(next).parent().data("index", e.index);
                if (options.showInfo) {
                    if (this.hasInfo(e.index)) {
                        o.append("<span>" + this.getData(e.index).title + "</span>");
                    }
                }
                _width = _width || $(next).parent().outerWidth(true);
                $(next).css("opacity", 0);
                self.unbind(options.thumbEventType);
                if (Galleria.IE) {
                    o.hide();
                } else {
                    o.css("opacity", 0);
                }
                if (Galleria.TOUCH) {
                    self.bind("touchstart", function() {
                        o.css("opacity", 1);
                    }).bind("touchend", function() {
                        o.hide();
                    });
                } else {
                    self.hover(function() {
                        if (Galleria.IE) {
                            o.show();
                        } else {
                            o.stop().css("opacity", 1);
                        }
                    }, function() {
                        if (Galleria.IE) {
                            o.hide();
                        } else {
                            o.stop().animate({
                                opacity : 0
                            }, 300);
                        }
                    });
                }
                getDataLength++;
                this.$("loaded").css("width", getDataLength / this.getDataLength() * 100 + "%");
                if (getDataLength === this.getDataLength()) {
                    this.$("preloader").fadeOut(100);
                    el.data("colCount", null);
                    init(el, {
                        width : _width,
                        speed : options._animate ? 400 : 0,
                        /**
                         * @return {undefined}
                         */
                        onbrick : function() {
                            var sourceContainer = this;
                            var i = $(sourceContainer).find("img");
                            window.setTimeout(function(f) {
                                return function() {
                                    Galleria.utils.animate(f, {
                                        opacity : 1
                                    }, {
                                        duration : options.transition_speed
                                    });
                                    f.parent().unbind("mouseup click").bind(Galleria.TOUCH ? "mouseup" : "click", function() {
                                        el.css("left", -1E4);
                                        pointer.css("left", 0);
                                        var pos = $(this).data("index");
                                        self.enterFullscreen(function() {
                                            self.show(pos);
                                        });
                                    });
                                };
                            }(i), options._animate ? i.parent().data("index") * 100 : 0);
                        },
                        /**
                         * @return {undefined}
                         */
                        onheight : function() {
                            $target.height(el.height());
                        }
                    });
                }
            });
            this.bind("loadstart", function(Associations) {
                if (!Associations.cached) {
                    loader.show();
                }
            });
            this.bind("data", function() {
                /** @type {number} */
                getDataLength = 0;
            });
            this.bind("loadfinish", function(e) {
                loader.hide();
                element.hide();
                if (this.hasInfo()) {
                    if (options.showInfo) {
                        if (this.isFullscreen()) {
                            element.fadeIn(options.transition ? options.transitionSpeed : 0);
                        }
                    }
                }
                resize($(e.imageTarget).width());
            });
            if (!Galleria.TOUCH) {
                if (!options._webkitCursor) {
                    this.addIdleState(this.get("image-nav-left"), {
                        left : -100
                    });
                    this.addIdleState(this.get("image-nav-right"), {
                        right : -100
                    });
                    this.addIdleState(this.get("info"), {
                        opacity : 0
                    });
                }
            }
            this.$("container").css({
                width : options.width,
                height : "auto"
            });
            if (options._webkitCursor) {
                if (Galleria.WEBKIT) {
                    if (!Galleria.TOUCH) {
                        this.$("image-nav-right,image-nav-left").addClass("cur");
                    }
                }
            }
            if (Galleria.TOUCH) {
                this.setOptions({
                    transition : "fadeslide",
                    initialTransition : false
                });
            }
            this.$("close").click(function() {
                self.exitFullscreen();
            });
            if (Galleria.History) {
                if (cDigit) {
                    pointer.css("left", 0);
                    el.css("left", -1E4);
                    this.$("preloader").hide();
                    this.enterFullscreen(function() {
                        this.show(parseInt(cDigit, 10));
                    });
                }
            }
            $(window).resize(function() {
                if (self.isFullscreen()) {
                    if (self.getActiveImage()) {
                        resize(self.getActiveImage().width);
                    }
                    return;
                }
                var err = $target.width();
                if (err !== error) {
                    error = err;
                    init(el, {
                        width : _width,
                        delay : 50,
                        debug : true,
                        /**
                         * @return {undefined}
                         */
                        onheight : function() {
                            $target.height(el.height());
                        }
                    });
                }
            });
        }
    });
})(jQuery);
