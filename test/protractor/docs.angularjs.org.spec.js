describe('docs.angularjs.org', function () {
  var protractor = require('protractor')
    , tractor = protractor.getInstance()
    , envConfig = require('../server/config/env-config')
    , HOST = envConfig.urls.docs;

  function queryCss (selector) {
    return tractor.findElement(protractor.By.css(selector));
  }

  describe('Pushstate', function () {
    it('should rewrite /guide to index.html', function () {
      tractor.get(HOST + '/guide');

      var introParagraph = tractor.findElement(protractor.By.css('.content p'));
      expect(introParagraph.getText()).toContain('Everything you need to know about AngularJS');
    });


    it('should rewrite /guide/directive to index.html', function () {
      tractor.get(HOST + '/guide/directive');

      var introParagraph = tractor.findElement(protractor.By.css('.content p'));
      expect(introParagraph.getText()).toContain('This document explains when you\'d want to create your own directives in your AngularJS app, and how to implement them.');
    });


    it('should rewrite /api to index.html', function () {
      tractor.get(HOST + '/api');

      var introParagraph = tractor.findElement(protractor.By.css('.content p'));
      introParagraph.getText().then(function (text) {
        expect(text).toContain('Welcome to the AngularJS API docs page.');
      });
    });


    it('should rewrite /api/ng.directive:ngApp to index.html', function () {
      tractor.get(HOST + '/api/ng.directive:ngApp');

      var introParagraph = tractor.findElement(protractor.By.css('.content p'));
      expect(introParagraph.getText()).toContain('Use this directive to auto-bootstrap an AngularJS application.');
    });


    it('should rewrite /cookbook to index.html', function () {
      tractor.get(HOST + '/cookbook');

      var introParagraph = tractor.findElement(protractor.By.css('.content p'));
      expect(introParagraph.getText()).toContain('Welcome to the Angular cookbook');
    });


    it('should rewrite /cookbook/form to index.html', function () {
      tractor.get(HOST + '/cookbook/form');

      var introParagraph = tractor.findElement(protractor.By.css('.content p'));
      expect(introParagraph.getText()).toContain('For this reason Angular strives to make both of these operations trivial.');
    });


    it('should rewrite /misc/contribute to index.html', function () {
      tractor.get(HOST + '/misc/contribute');

      var introParagraph = tractor.findElement(protractor.By.css('.content'));
      expect(introParagraph.getText()).toContain('Building AngularJS');
    });


    it('should rewrite /tutorial to index.html', function () {
      tractor.get(HOST + '/tutorial');

      var introParagraph = tractor.findElement(protractor.By.css('.content p'));
      expect(introParagraph.getText()).toContain('A great way to get introduced to AngularJS is to work through this tutorial');
    });


    it('should rewrite /tutorial/step_01 to index.html', function () {
      tractor.get(HOST + '/tutorial/step_01');

      var introParagraph = tractor.findElement(protractor.By.css('.content p'));
      expect(introParagraph.getText()).toContain('In order to illustrate how Angular enhances standard HTML');
    });


    it('should rewrite /error to index.html', function () {
      tractor.get(HOST + '/error');

      var introParagraph = tractor.findElement(protractor.By.css('.content p'));
      expect(introParagraph.getText()).toContain('Use the Error Reference manual');
    });


    it('should rewrite /error/ng:cpi to index.html', function () {
      tractor.get(HOST + '/error/ng:cpi');
      var errorPre = tractor.findElement(protractor.By.css('.minerr-errmsg'));
      expect(errorPre.getText()).toContain('Source and destination are identical.');
    });
  });


  describe('Bad Deep Urls', function () {
    it('should return 404 for /api/api', function () {
      var loaded;

      browser.driver.get(HOST + '/api/api').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('404 Not Found');
    });


    it('should return 404 for /api/tutorial', function () {
      var loaded;

      browser.driver.get(HOST + '/api/tutorial').then(function () {
        loaded = true;
      });

      expect(browser.driver.getTitle()).toBe('404 Not Found');
    });


    it('should return 404 for /tutorial/guide', function () {
      var loaded;

      browser.driver.get(HOST + '/tutorial/guide').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('404 Not Found');
    });


    it('should return 404 for /misc/tutorial', function () {
      var loaded;

      browser.driver.get(HOST + '/misc/tutorial').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('404 Not Found');
    });
  })


  describe('Crawlability', function () {
    it('should return a partial when requesting /?_escaped_fragment_=/api/angular.bind', function () {
      var loaded;

      browser.driver.get(HOST + '/?_escaped_fragment_=/api/angular.bind').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('AngularJS Documentation for bind');
    });


    it('should return a partial when requesting /?_escaped_fragment_=/api/ng.directive:ngMouseover', function () {
      var loaded;

      browser.driver.get(HOST + '/?_escaped_fragment_=/api/ng.directive:ngMouseover').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('AngularJS Documentation for ngMouseover');
    });


    describe('_escaped_fragment_ Title Tags', function () {

      it('should return an appropriate title when path contains : ', function () {
        var loaded;

        browser.driver.get(HOST + '?_escaped_fragment_=/api/ng.directive:ngRepeat').then(function () {
          loaded = true;
        });

        tractor.wait(function () {
          return loaded;
        }, 2500, 'for page to load');

        expect(browser.driver.getTitle()).toBe('AngularJS Documentation for ngRepeat');
      });


      it('should return an appropriate title when path contains . ', function () {
        var loaded;

        browser.driver.get(HOST + '/?_escaped_fragment_=/api/ng.$rootScope.Scope').then(function () {
          loaded = true;
        });

        tractor.wait(function () {
          return loaded;
        }, 2500, 'for page to load');

        expect(browser.driver.getTitle()).toBe('AngularJS Documentation for Scope');
      });


      it('should return an appropriate title when path contains no special characters', function () {
        var loaded;

        browser.driver.get(HOST + '?_escaped_fragment_=/api/ngSanitize').then(function () {
          loaded = true;
        });

        tractor.wait(function () {
          return loaded;
        }, 2500, 'for page to load');

        expect(browser.driver.getTitle()).toBe('AngularJS Documentation for ngSanitize');
      });
    });


    it('should return a partial when requesting /api/ng.directive:ngHref?_escaped_fragment_', function () {
      var loaded;

      browser.driver.get(HOST + '/api/ng.directive:ngHref?_escaped_fragment_').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('AngularJS Documentation for ngHref');

      var heading = browser.driver.findElement(protractor.By.css('h1 code'));
      expect(heading.getText()).toBe('ngHref');
    });


    it('should return a partial when requesting /api/ng.directive:ngHref?_escaped_fragment_=', function () {
      var loaded;

      browser.driver.get(HOST + '/api/ng.directive:ngHref?_escaped_fragment_=').then(function () {
        loaded = true;
      });
      expect(browser.driver.getTitle()).toBe('AngularJS Documentation for ngHref');

      var heading = browser.driver.findElement(protractor.By.css('h1 code'));
      expect(heading.getText()).toBe('ngHref');
    });


    it('should return a partial when requesting /guide/concepts?_escaped_fragment_=', function () {
      var loaded;

      browser.driver.get(HOST + '/guide/concepts?_escaped_fragment_=').then(function () {
        loaded = true;
      });
      expect(browser.driver.getTitle()).toBe('AngularJS Documentation for concepts');

      var heading = browser.driver.findElement(protractor.By.css('#a-first-example-data-binding'));
      expect(heading.getText()).toBe('A first example: Data binding');
    });


    it('should return a partial when requesting /', function () {
      var loaded;

      browser.driver.get(HOST + '?_escaped_fragment_=').then(function () {
        loaded = true;
      });
      expect(browser.driver.getTitle()).toBe('AngularJS Documentation for index');

      var heading = browser.driver.findElement(protractor.By.css('#angularjs-api-docs'));
      expect(heading.getText()).toBe('AngularJS API Docs');
    });


    it('should return a partial when requesting /guide?_escaped_fragment_=', function () {
      var loaded;

      browser.driver.get(HOST + '/guide?_escaped_fragment_=').then(function () {
        loaded = true;
      });
      expect(browser.driver.getTitle()).toBe('AngularJS Documentation for index');

      var heading = browser.driver.findElement(protractor.By.css('#guide-to-angularjs-documentation'));
      expect(heading.getText()).toBe('Guide to AngularJS Documentation');
    });


    it('should return a partial when requesting /guide/?_escaped_fragment_=', function () {
      var loaded;

      browser.driver.get(HOST + '/guide/?_escaped_fragment_=').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('AngularJS Documentation for index');

      var heading = browser.driver.findElement(protractor.By.css('#guide-to-angularjs-documentation'));
      expect(heading.getText()).toBe('Guide to AngularJS Documentation');
    });


    it('should return a partial when requesting /cookbook/?_escaped_fragment_=', function () {
      var loaded;

      browser.driver.get(HOST + '/cookbook/?_escaped_fragment_=').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('AngularJS Documentation for index');

      var heading = browser.driver.findElement(protractor.By.css('#hello-world'));
      expect(heading.getText()).toBe('Hello World');
    });


    it('should return a partial when requesting /tutorial/?_escaped_fragment_=', function () {
      var loaded;

      browser.driver.get(HOST + '/tutorial/?_escaped_fragment_=').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('AngularJS Documentation for index')

      var heading = browser.driver.findElement(protractor.By.css('#working-with-the-code'));
      expect(heading.getText()).toBe('Working with the code');
    });


    it('should return a 404 status code for bogus _escaped_fragment_ urls', function () {
      var loaded;

      browser.driver.get(HOST + '/misc/tutorial/api/guide/misc/misc/%7B%7Bmodule.url%7D%7D?_escaped_fragment_=').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('404 Not Found');
    });


    it('should return a 404 status code for deep paths such as /tutorial/tutorial/api?_escaped_fragment_=', function () {
      var loaded;

      browser.driver.get(HOST + '/tutorial/tutorial/api?_escaped_fragment_=').then(function () {
        loaded = true;
      });

      tractor.wait(function () {
        return loaded;
      }, 2500, 'for page to load');

      expect(browser.driver.getTitle()).toBe('404 Not Found');
    });
  });


  describe('App', function () {
    // it('should filter the module list when searching', function () {
    //   tractor.get(HOST);
    //   tractor.waitForAngular();

    //   var search = tractor.findElement(protractor.By.input('q'));
    //   search.clear();
    //   search.sendKeys('ngBind');

    //   var firstModule = tractor.findElement(protractor.By.css('.search-results a'));
    //   expect(firstModule.getText()).toEqual('ngBind');
    // });


    it('should change the page content when clicking a link to a service', function () {
      tractor.get(HOST);

      var ngBindLink = tractor.findElement(protractor.By.css('.definition-table td a[href="api/ng.directive:ngClick"]'));
      ngBindLink.click();

      var pageBody = tractor.findElement(protractor.By.css('.content h1 code'));
      expect(pageBody.getText()).toEqual('ngClick');
    });


    it('should show the functioning input directive example', function () {
      tractor.get(HOST + '/api/ng.directive:input');
      //Wait for animation
      tractor.sleep(500);

      var nameInput = tractor.findElement(protractor.By.input('user.name'));
      nameInput.click();
      nameInput.sendKeys('!!!');

      var code = tractor.findElement(protractor.By.css('.doc-example-live tt'));
      expect(code.getText()).toContain('guest!!!');
    });
  });
})
