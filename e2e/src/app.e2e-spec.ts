import { browser, by, element } from 'protractor';

describe('Angular Movie App E2E Tests', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should display the dashboard view', () => {
    element(by.linkText('Dashboard')).click();
    expect(browser.getCurrentUrl()).toContain('/dashboard');
    expect(element(by.css('app-dashboard')).isPresent()).toBe(true);
  });

  it('should display the movies list view', () => {
    element(by.linkText('Movies List')).click();
    expect(browser.getCurrentUrl()).toContain('/movies-list');
    expect(element(by.css('app-movies-list')).isPresent()).toBe(true);
  });

  it('should filter movies by year', () => {
    element(by.linkText('Movies List')).click();
    element(by.css('select#year-filter')).sendKeys('2018');
    element(by.css('button#apply-filters')).click();
    // Add assertions to check if the filtered results are displayed
  });

  it('should filter movies by winner status', () => {
    element(by.linkText('Movies List')).click();
    element(by.css('select#winner-filter')).sendKeys('True');
    element(by.css('button#apply-filters')).click();
    // Add assertions to check if the filtered results are displayed
  });

  it('should paginate through movies list', () => {
    element(by.linkText('Movies List')).click();
    element(by.css('button.next-page')).click();
    // Add assertions to check if the next page of results is displayed
  });
});