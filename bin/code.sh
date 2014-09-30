
# source this in the bashrc (or similar)
# TODO: add to code go call

# this changes my prompt to "codego_dir"??
function codego {
	codego_dir=`code go $1 --just-path`
	retval=$?
	if [ $retval -eq 0 ]; then
		echo "Changing dir to $codego_dir"
	    cd $codego_dir
	else

	fi
}