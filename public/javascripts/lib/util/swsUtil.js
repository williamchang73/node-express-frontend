
var SWSUtility = {};


/**
 * Ajax call for zembo
 * @param {object} options Options for jQuery ajax, reference to http://api.jquery.com/category/ajax/
 * @param {function(<object>)} options.success Callback function, invoked if result.status equals <code>true</code>. Send result.data as argument.
 * @param {function(<object>)} options.error Callback function, invoked if result.status equals <code>false</code>. Send result as argument.
 */
SWSUtility.ajax = function(options) {
	try {
		if (!options || !options.url) {
			return;
		}

		options.success = options.success || function() { };
		options.error = options.error || function() { }; 
		options.complete = options.complete || function() { };

		var resultTemplate = {
			status : false,
			status_ext : "",
			data : null,
			error_code : "",
			error_message : ""
		};

		//fix bug the async should be true not "true", false not "false"
		if (options.async == 'false') {
			options.async = false;
		} else {
			options.async = true;
		}

		$.ajax({
            url : options.url,
            data : options.data,
            dataType : options.dataType || "json",
            type : options.type || "POST",
            async : options.async,
            success : function(data, textStatus) {
                if (data && typeof data == "object") {
                    if (data.status) {
                        // Success
                        options.success(data.data);
                    } else {
                        options.error(data);
                    }
                } else {
                    resultTemplate.error_code = SWSUtility.ErrorCode.IncorrectFormat;
                    resultTemplate.error_message = "Incorrect data format received from url:"
                            + options.url
                            + " result: "
                            + JSON.stringify(data) + ". ";
                    options.error(resultTemplate);
                }
            },
            error : function(jqXHR, textStatus) {
                if (textStatus == "parsererror") {
                    console.error(jqXHR.responseText);
                }
                resultTemplate.error_code = SWSUtility.ErrorCode.SendRequestFailed;
                resultTemplate.error_message = "Send request to url:"
                        + options.url + " failed. Status: "
                        + textStatus + ". ";
                options.error(resultTemplate);
            },
            complete : function(jqXHR, textStatus) {
                options.complete(jqXHR, textStatus);
            }
        });
	} catch (x) {
		console.error("Request ajax call failed, " + x);
	}
};
SWSUtility.ErrorCode = {
	SendRequestFailed : "send request failed",
	IncorrectFormat : "incorrect response format from server"
};