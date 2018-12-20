'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlaidLink = function (_Component) {
    _inherits(PlaidLink, _Component);

    function PlaidLink(props) {
        _classCallCheck(this, PlaidLink);

        var _this = _possibleConstructorReturn(this, (PlaidLink.__proto__ || Object.getPrototypeOf(PlaidLink)).call(this, props));

        _this.state = {
            disabledButton: true
        };

        _this.onScriptError = _this.onScriptError.bind(_this);
        _this.onScriptLoaded = _this.onScriptLoaded.bind(_this);
        _this.handleLinkOnLoad = _this.handleLinkOnLoad.bind(_this);
        _this.handleOnClick = _this.handleOnClick.bind(_this);
        return _this;
    }

    _createClass(PlaidLink, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (typeof window.Plaid === 'undefined' && document.getElementById('link-init') === null) {
                this.linkInitialize = document.createElement('script');
                this.linkInitialize.type = 'text/javascript';
                this.linkInitialize.id = 'link-init';
                this.linkInitialize.async = true;
                this.linkInitialize.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
                this.linkInitialize.onerror = function () {
                    return _this2.onScriptError();
                };
                this.linkInitialize.onload = function () {
                    return _this2.onScriptLoaded();
                };
                document.body.appendChild(this.linkInitialize);
            } else {
                this.externalScriptTimeout = setTimeout(function () {
                    _this2.onScriptLoaded();
                }, 1000);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.externalScriptTimeout);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.apiVersion !== prevProps.apiVersion || this.props.clientName !== prevProps.clientName || this.props.env !== prevProps.env || this.props.key !== prevProps.key || this.props.onExit !== prevProps.onExit || this.props.onLoad !== prevProps.onLoad || this.props.onEvent !== prevProps.onEvent || this.props.onSuccess !== prevProps.onSuccess || this.props.product !== prevProps.product || this.props.selectAccount !== prevProps.selectAccount || this.props.token !== prevProps.token || this.props.webhook !== prevProps.webhook) {
                this.onScriptLoaded();
            }
        }
    }, {
        key: 'onScriptError',
        value: function onScriptError() {
            console.error('There was an issue loading the link-initialize.js script');
        }
    }, {
        key: 'onScriptLoaded',
        value: function onScriptLoaded() {
            this.setState({
                disabledButton: false,
                linkHandler: window.Plaid.create({
                    apiVersion: this.props.apiVersion,
                    clientName: this.props.clientName,
                    env: this.props.env,
                    key: this.props.publicKey,
                    onExit: this.props.onExit,
                    onLoad: this.handleLinkOnLoad,
                    onEvent: this.props.onEvent,
                    onSuccess: this.props.onSuccess,
                    product: this.props.product,
                    selectAccount: this.props.selectAccount,
                    token: this.props.token,
                    webhook: this.props.webhook
                })
            });
        }
    }, {
        key: 'handleLinkOnLoad',
        value: function handleLinkOnLoad() {
            if (this.props.onLoad != null) {
                this.props.onLoad();
            }
        }
    }, {
        key: 'handleOnClick',
        value: function handleOnClick() {
            if (this.props.onClick != null) {
                this.props.onClick();
            }
            var institution = this.props.institution || null;
            if (this.state.linkHandler) {
                this.state.linkHandler.open(institution);
            }
        }
    }, {
        key: 'exit',
        value: function exit(configurationObject) {
            if (this.state.linkHandler) {
                this.state.linkHandler.exit(configurationObject);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'button',
                {
                    onClick: this.handleOnClick,
                    disabled: this.state.disabledButton,
                    style: this.props.style,
                    className: this.props.className,
                    title: this.props.title
                },
                this.props.children
            );
        }
    }]);

    return PlaidLink;
}(_react.Component);

PlaidLink.propTypes = {
    // ApiVersion flag to use new version of Plaid API
    apiVersion: _propTypes2.default.string,

    // Displayed once a user has successfully linked their account
    clientName: _propTypes2.default.string.isRequired,

    // The Plaid API environment on which to create user accounts.
    // For development and testing, use tartan. For production, use production
    env: _propTypes2.default.oneOf(['tartan', 'sandbox', 'development', 'production']).isRequired,

    // Open link to a specific institution, for a more custom solution
    institution: _propTypes2.default.string,

    // The public_key associated with your account; available from
    // the Plaid dashboard (https://dashboard.plaid.com)
    publicKey: _propTypes2.default.string.isRequired,

    // The Plaid products you wish to use, an array containing some of connect,
    // auth, identity, income, transactions
    product: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['connect', // legacy product name
    'info', // legacy product name
    'auth', 'identity', 'income', 'transactions'])).isRequired,

    // Specify an existing user's public token to launch Link in update mode.
    // This will cause Link to open directly to the authentication step for
    // that user's institution.
    token: _propTypes2.default.string,

    // Set to true to launch Link with the 'Select Account' pane enabled.
    // Allows users to select an individual account once they've authenticated
    selectAccount: _propTypes2.default.bool,

    // Specify a webhook to associate with a user.
    webhook: _propTypes2.default.string,

    // A function that is called when a user has successfully onboarded their
    // account. The function should expect two arguments, the public_key and a
    // metadata object
    onSuccess: _propTypes2.default.func.isRequired,

    // A function that is called when a user has specifically exited Link flow
    onExit: _propTypes2.default.func,

    // A function that is called when the Link module has finished loading.
    // Calls to plaidLinkHandler.open() prior to the onLoad callback will be
    // delayed until the module is fully loaded.
    onLoad: _propTypes2.default.func,

    // A function that is called during a user's flow in Link.
    // See
    onEvent: _propTypes2.default.func,

    // Button Styles as an Object
    style: _propTypes2.default.object,

    // Button Class names as a String
    className: _propTypes2.default.string,

    // Title to display for accessibility
    title: _propTypes2.default.string
};

PlaidLink.defaultProps = {
    apiVersion: 'v2',
    env: 'sandbox',
    institution: null,
    selectAccount: false,
    token: null,
    style: {
        padding: '6px 4px',
        outline: 'none',
        background: '#FFFFFF',
        border: '2px solid #F1F1F1',
        borderRadius: '4px'
    }
};

exports.default = PlaidLink;