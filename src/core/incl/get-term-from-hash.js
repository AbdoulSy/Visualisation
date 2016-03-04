module.exports = function() {
        var term = window.location.hash || '' ;
        return term.replace('#','');
};
