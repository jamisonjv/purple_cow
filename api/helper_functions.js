// standard endpoint request/response handler: throw error if needed, return output otherwise
// assumes f is asynchronous
const handle_response = (req, res, f) => {
	f.then(x => {
		res.json(x);
	}).catch(err => {
		return res.status(404).json({success:false, err_stack: err.stack});
	});
}

module.exports = {
	handle_response: handle_response
} 