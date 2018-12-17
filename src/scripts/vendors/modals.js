// Modals and backdrop
function bdModal(options) {
    function Init(options) {
        var settings,
            backdrop,
            openBtn,
            closeBtn,
            changeBtn,
            body = document.querySelector('body'),
            bodyOverflow = 'overflow',
            container = document.querySelector('.backdropContainer'),
            itemClass = '.backdropItem',
            item,
            configObserver = {
                childList: true 
            },
            detail = {
                current: null
            },
            defaultSettings = {
                openBtn: '.bdOpen',
                closeBtn: '.bdClose',
                changeBtn: '.bdChange',
                speed: 300
            }

        function hasProp(prop) {
            if (!options.hasOwnProperty(prop)) {
                settings[prop] = defaultSettings[prop];
            } else {
                settings[prop] = options[prop];
            }
        }

        if (!options && typeof options !== 'object') {
            settings = defaultSettings
        } else {
            settings = options;
            ['openBtn', 'closeBtn', 'speed', 'changeBtn'].forEach(function (el) {
                hasProp(el);
            })
        }

        function createBackdrop() {
            if(!document.querySelector('.backdrop')) {
                var el = document.createElement('div');
                el.className = 'backdrop';
                body.insertBefore(el, container);
                backdrop = el;
            }
        }

        // Utils
        function typeSelector(selector) {
            var element;
            if (typeof selector === 'string') {
                element = document.querySelectorAll(selector)
            } else {
                element = selector
            }
            return element
        }

        function s(el, cb) {
            if (typeof el === 'string') {
                document.querySelectorAll(el).forEach(function (el, indx) {
                    cb(el, indx)
                })
            } else {
                if (!el) return;
                if (el.length === undefined) {
                    cb(el)
                } else {
                    el.forEach(function (el, indx) {
                        cb(el, indx)
                    })
                }
            }
        }

        function hasClass(el, className) {
            var element;
            if (!el) return;
            if (typeof el === 'string') {
                element = document.querySelectorAll(el);
            } else {
                element = el;
            }
            return element.classList.contains(className)
        }

        function removeClass(el, state) {
            s(el, function (el) {
                el.classList.remove(state);
            })
        }

        function addClass(el, state) {
            s(el, function (el) {
                el.classList.add(state);
            })
        }

        function toggleDisplay(el, value) {
            s(el, function (el) {
                el.style.display = value
            })
        }

        function fadeIn(el, display, style) {
            toggleDisplay(el, display);
            setTimeout(addClass, 100, el, style)
        }

        function fadeOut(el, style, time) {
            removeClass(el, style);
            setTimeout(toggleDisplay, time, el, 'none')
        }

        function paddingRight(arg) {
            var width = window.innerWidth - document.documentElement.clientWidth;
            if(arg) {
                if (width != '0') {
                    body.style.paddingRight = width + 'px'
                }
            } else {
                body.style.paddingRight = 0 + 'px'
            }
        }

        // Events
        var openEvent = new CustomEvent('open', {
            detail: detail
        });

        // Methods
        function openBackdrop() {
            fadeIn(backdrop, 'block', 'active')
        }

        function closeBackdrop() {
            fadeOut(backdrop, 'active', settings.speed);
        }

        function setCurrentModal(el) {
            detail.current = document.querySelector(el);
            document.dispatchEvent(openEvent);
        }

        function open(thatModal) {
            paddingRight(true)
            setCurrentModal(thatModal);
            addClass(body, bodyOverflow);
            openBackdrop();
            toggleDisplay(container, 'flex');
            fadeIn(thatModal, 'flex', 'active');
        }

        function close(modal) {
            var el;
            if (modal && modal === false) {
                el = typeSelector(modal);
            } else {
                el = item
            }
            closeBackdrop();
            fadeOut(el, 'active', settings.speed);
            setTimeout(function () {
                toggleDisplay(container, 'none');
                paddingRight()
                removeClass(body, bodyOverflow);
            }, settings.speed + 100)
        }

        function change(current, next) {
            setCurrentModal(next);
            if (!hasClass(current, 'active')) return;
            fadeOut(current, 'active', settings.speed);
            setTimeout(function () {
                fadeIn(next, 'flex', 'active');
            }, settings.speed + 100)
        }

        function setElements() {
            openBtn = typeSelector(settings.openBtn);
            item = typeSelector(itemClass);
            closeBtn = typeSelector(settings.closeBtn);
            changeBtn = typeSelector(settings.changeBtn); 
        }

        function outsideClick() {
            document.addEventListener('click', function (e) {
                var target = e.target;
                if (target.closest(itemClass)) return;
                s(item, function (el) {
                    if (hasClass(el, 'active')) {
                        close();
                    }
                })
            });
        }

        function updateListener(el,evt,func) {
            el.removeEventListener(evt, func)
            el.addEventListener(evt, func)
        }

        function openBtnInit() {
            function listener() {
                var data = this.dataset.modal;
                open('#' + data);
            }
            s(openBtn, function(el) {
                updateListener(el,'click', listener)
            })
        }

        function closeBtnInit() {
            s(closeBtn, function (el) {
                updateListener(el,'click', close)
            })
        }

        function changeBtnInit() {
            function listener() {
                var data = this.dataset.target;
                change(detail.current, data);
            }
            s(changeBtn, function (el) {
                updateListener(el,'click', listener)
            })
        }
        
        function initElements() {
            setElements();
            outsideClick();
            openBtnInit();
            closeBtnInit();
            changeBtnInit();
        }

        // MutationObserver
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function () {
                initElements();
            });
        });

        observer.observe(container, configObserver);

        // Init
        createBackdrop();
        initElements();

        // Api
        this.open = function (thatModal, content) {
            if(content) {
                container.insertAdjacentHTML('beforeEnd', content);
            }
            open(thatModal);
        }

        this.change = function (current, next) {
            change(current, next)
        }

        this.close = function (thatModal) {
            close(thatModal)
        }

        this.reinit = function() {
            initElements();
        }
    }
    return new Init(options)
}

module.exports = bdModal