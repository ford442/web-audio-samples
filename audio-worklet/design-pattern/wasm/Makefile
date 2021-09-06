DEPS = SimpleKernel.cc

build: $(DEPS)
	@emcc --bind -O1 \
		SimpleKernel.cc \
		-o simple-kernel.wasmmodule.js \
		--post-js ../lib/em-es6-module.js

clean:
	@rm -f simple-kernel.wasmmodule.js