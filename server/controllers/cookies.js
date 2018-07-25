module.exports = {
	sendCookie: (req, res) => {
		res.cookie("cookie_name", "cookie_value").send("Cookie is set")
	}
}