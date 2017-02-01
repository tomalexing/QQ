    export function classRegex(classname) {
        return new RegExp("(^|\\s+)" + classname + "(\\s+|$)");
    }
    export function hasClass(el, c) {
        return classRegex(c).test(el.className);
    }
    export function addClass(el, c) {
        if (!hasClass(el, c))
            el.className = el.className + " " + c;
    }
    export function removeClass(el, c) {
        el.className = el.className.replace(classRegex(c), ' ')
    }

    export function each(target, fn){
        if(Array.isArray(target)){
            return target.forEach(fn)
        }
        else{
            Object.keys(target).forEach((key, i, arr) =>{
                 fn(key, target[key], i ,arr)
            })
        }
    }

        /**
     * Attach a handler to an event for all elements matching a selector.
     *
     * @param  {Element} target    - Element which the event must bubble to
     * @param  {string} selector   - Selector to match
     * @param  {string} type       - Event name
     * @param  {Function} handler  - Function called when the event bubbles to target
     *                               from an element matching selector
     * @param  {boolean} [capture] - Capture the event
     * @return {Function}          - Function for removing listener
     */
    export function  delegate(target, type, selector, handler, capture) {
        const dispatchEvent = (event) => {
            // console.time('delegate');
            let targetElement = event.target;

            while (targetElement && targetElement !== target ) {
            if (targetElement.matches(selector)) {
                event.delegateTarget = event.delegateTarget || targetElement;
                handler.call(this, event);
                break;
            }
            targetElement = targetElement.parentNode;
            }
            // console.timeEnd('delegate');
        };

        target.addEventListener(type, dispatchEvent, !!capture);

        return () => target.removeEventListener(type, dispatchEvent, !!capture);

    };


// matches polyfill
    (function(e) {
     e.matches || (e.matches = e.matchesSelector || function(selector) {
        var matches = document.querySelectorAll(selector), th = this;

        return Array.prototype.some.call(matches, function(e) {
        return e === th;
        });
    });
    }) (Element.prototype);