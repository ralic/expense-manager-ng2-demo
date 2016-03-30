System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var VaadinElement;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /*
            * This directive aims to overcome the current issues in integrating vaadin-elements to an Angular 2 app.
            */
            VaadinElement = (function () {
                function VaadinElement(viewContainer) {
                    var _this = this;
                    this.viewContainer = viewContainer;
                    this.stopper = function (e) {
                        e.stopPropagation();
                    };
                    this.element = viewContainer.element.nativeElement;
                    if (this.element.is === 'vaadin-grid') {
                        var grid = this.element;
                        // Need to stop selected-items-changed events during init to
                        // avoid "Attempt to use a dehydrated detector" error.
                        window.addEventListener('selected-items-changed', this.stopper, true);
                        // Configuration <table> might be placed in a wrong container.
                        // Let's move it in the light dom programmatically to fix that.
                        var localDomTable = grid.querySelector("table:not(.style-scope)");
                        if (localDomTable) {
                            Polymer.dom(grid).appendChild(localDomTable);
                        }
                        // vaadin-grid 1.0 doesn't support placing a configuration table dynamically. A hacky workaround needed for now.
                        var _c = grid._grid.c;
                        try {
                            grid._grid.c = null;
                            grid._grid.init(grid, grid._findTableElement(Polymer.dom(grid).children), Polymer.dom(grid.root), grid.$.measureobject);
                        }
                        catch (e) {
                            grid._grid.c = _c;
                        }
                    }
                    if (this.element.is === 'vaadin-combo-box' || this.element.is === 'vaadin-date-picker') {
                        // Need to fire 'input' event manually so ngControl can react to changes
                        this.element.addEventListener('value-changed', function () {
                            _this.element.fire('input');
                        });
                        // Need to fire 'blur' event manually so ngControl can react to changes
                        this.element.$$('paper-input-container').addEventListener('blur', function () {
                            if (!_this.element.opened && !_this.element._opened) {
                                _this.element.fire('blur');
                            }
                        });
                    }
                }
                VaadinElement.prototype.ngOnInit = function () {
                    window.removeEventListener('selected-items-changed', this.stopper, true);
                };
                VaadinElement = __decorate([
                    core_1.Directive({
                        selector: 'vaadin-grid, vaadin-combo-box, vaadin-date-picker, vaadin-upload'
                    }), 
                    __metadata('design:paramtypes', [core_1.ViewContainerRef])
                ], VaadinElement);
                return VaadinElement;
            })();
            exports_1("VaadinElement", VaadinElement);
        }
    }
});
//# sourceMappingURL=vaadin_element.directive.js.map